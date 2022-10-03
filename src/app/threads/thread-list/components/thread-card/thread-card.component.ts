import { Component, Input } from '@angular/core';

import { Thread } from '$threads/thread-list/shared/interfaces/threads.interface';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
})
export class ThreadCardComponent {
  @Input() thread!: Thread;

  constructor() {}
}
