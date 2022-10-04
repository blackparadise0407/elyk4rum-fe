import { Component, Input, OnInit } from '@angular/core';

import { Thread } from '$threads/thread-list/shared/interfaces/threads.interface';

const WPM = 238;
@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
})
export class ThreadCardComponent implements OnInit {
  @Input() thread!: Thread;
  public minsRead = 0;

  constructor() {}

  public ngOnInit(): void {
    this.minsRead = Math.ceil(this.thread.content.split(' ').length / WPM);
  }
}
