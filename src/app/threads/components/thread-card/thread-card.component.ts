import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

import { EBlockType, ImageBlock } from '$shared/interfaces/editorjs.interface';
import { SharedService } from '$shared/services/shared.service';
import { ToastService } from '$shared/services/toast.service';
import { get, getWordCount } from '$shared/utils/index.util';
import { Thread } from '$threads/shared/interfaces/threads.interface';

const WPM = 238;
@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
})
export class ThreadCardComponent implements OnInit, OnDestroy {
  @Input() thread!: Thread;
  public minsRead = 0;
  public threadBg?: string;
  public saved = false;
  private stop$ = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.getThreadBg();
    this.calculateMinsRead();
    this.sharedService.savedThreads$
      .pipe(
        tap((savedThreads) => {
          this.saved = savedThreads.includes(this.thread.id);
        }),
        takeUntil(this.stop$)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  public handleSaveOrUnsaveThread() {
    this.sharedService
      .saveOrUnsaveThread(this.thread.id)
      .pipe(
        tap(({ savedThreads }) => {
          let action = '';
          if (savedThreads.includes(this.thread.id)) {
            action = 'Lưu';
          } else action = 'Bỏ lưu';
          this.toastService.enqueue(`${action} bài viết thành công`);
        })
      )
      .subscribe();
  }

  private getThreadBg() {
    const bgIdx = this.thread.blocks.findIndex(
      (block) => block.type === EBlockType.image
    );
    if (bgIdx > -1) {
      this.threadBg = (this.thread.blocks[bgIdx] as ImageBlock).data.file.url;
      return;
    }
    this.threadBg = '/assets/images/thread-bg-placeholder.jpg';
  }

  private calculateMinsRead() {
    const wordCount = this.thread.blocks.reduce((acc, curr) => {
      return (acc += getWordCount(get(curr, 'data.text', '')));
    }, 0);
    this.minsRead = Math.ceil(wordCount / WPM);
  }
}
