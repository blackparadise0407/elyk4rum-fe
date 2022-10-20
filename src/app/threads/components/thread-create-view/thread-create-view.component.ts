import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CategoriesService } from 'src/app/admin/shared/services/categories.service';

import { OutputData } from '$shared/interfaces/editorjs.interface';
import { ToastService } from '$shared/services/toast.service';
import { notNull } from '$shared/utils/rxjs.util';
import { Thread } from '$threads/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/shared/services/threads.service';

import {
  AdditionalCreateThreadComponent,
  AdditionalCreateThreadDialogData,
  AdditionalCreateThreadDialogFormData,
} from '../additional-create-thread/additional-create-thread.component';

@Component({
  selector: 'app-thread-create-view',
  templateUrl: './thread-create-view.component.html',
  styleUrls: ['./thread-create-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ThreadCreateViewComponent implements OnInit, OnDestroy {
  public titleCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  public hasContentSaved = false;
  public editorData?: OutputData;
  public draftId?: string;
  public loadingDraft = false;
  public draftThread?: Thread;
  private save$ = new Subject<void>();
  private stop$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private threadsService: ThreadsService,
    private toast: ToastService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadDraftThreadInfo();
    this.initEditorSubscription();
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
    this.threadsService.clearData();
  }

  public nextStep() {
    if (this.titleCtrl.errors) {
      this.toast.enqueue('Tiêu đề không được để trống và bé hơn 10 ký tự', {
        variant: 'error',
      });
      return;
    }

    const dialogRef = this.dialog.open<
      AdditionalCreateThreadComponent,
      AdditionalCreateThreadDialogData
    >(AdditionalCreateThreadComponent, {
      data: {
        categories$: this.categoriesService.getAll(),
      },
    });
    dialogRef.componentInstance.create
      .pipe(takeUntil(this.stop$))
      .subscribe((result) => {
        this.handleCreateThread(result);
        dialogRef.close();
        this.router.navigate(['/']);
      });
  }

  public saveAsDraft() {
    if (this.titleCtrl.errors) {
      this.toast.enqueue('Tiêu đề không được để trống và bé hơn 10 ký tự', {
        variant: 'error',
      });
      return;
    }
    this.save$.next();
  }

  private initEditorSubscription() {
    this.threadsService.editorData$
      .pipe(
        filter(notNull),
        tap((jsonData) => {
          this.editorData = jsonData;
        }),
        withLatestFrom(this.save$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
          ([v]) => v.blocks
        ),
        tap(() => {
          this.hasContentSaved = false;
          this.loadingDraft = true;
        }),
        switchMap(([{ blocks }]) =>
          this.threadsService
            .create({
              id: this.draftId,
              blocks: blocks ?? [],
              title: this.titleCtrl.value,
              draft: true,
            })
            .pipe(
              tap((thread) => {
                this.draftId = thread.id;
                this.toast.enqueue('Tạo nháp thành công');
              }),
              finalize(() => {
                this.hasContentSaved = true;
                this.loadingDraft = false;
              })
            )
        ),
        takeUntil(this.stop$)
      )
      .subscribe();
  }

  private loadDraftThreadInfo() {
    this.draftId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.draftId) {
      this.threadsService.editedThread$
        .pipe(
          switchMap((thread) => {
            if (!thread || thread.id !== this.draftId) {
              return this.threadsService.loadDraftThread(
                thread?.id ?? this.draftId!
              );
            }
            return of(thread);
          }),
          tap((thread) => {
            this.draftThread = thread;
            this.buildForm(thread);
          }),
          takeUntil(this.stop$)
        )
        .subscribe();
    }
  }

  private buildForm(draftThread: Thread) {
    this.titleCtrl.setValue(draftThread.title ?? '');
    this.threadsService.editorData$.next({
      blocks: draftThread.blocks,
    });
  }

  private handleCreateThread(result: AdditionalCreateThreadDialogFormData) {
    this.threadsService
      .create({
        id: this.draftId,
        blocks: this.editorData?.blocks ?? [],
        title: this.titleCtrl.value,
        draft: false,
        ...result,
      })
      .subscribe();
  }
}
