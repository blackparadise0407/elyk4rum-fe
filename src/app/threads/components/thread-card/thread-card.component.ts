import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

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

  constructor() {}

  public ngOnInit(): void {
    // this.minsRead = Math.round(this.thread.content.split(' ').length / WPM);
    this.minsRead = Math.round(500 / WPM);
  }
}
