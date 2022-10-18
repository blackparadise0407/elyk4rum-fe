import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { EBlockType, ImageBlock } from '$shared/interfaces/editorjs.interface';
import { Thread } from '$threads/shared/interfaces/threads.interface';

const WPM = 238;
@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCardComponent implements OnInit {
  @Input() thread!: Thread;
  public minsRead = 0;
  public threadBg?: string;

  constructor() {}

  public ngOnInit(): void {
    // this.minsRead = Math.round(this.thread.content.split(' ').length / WPM);
    this.minsRead = Math.round(500 / WPM);
    this.getThreadBg();
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
}
