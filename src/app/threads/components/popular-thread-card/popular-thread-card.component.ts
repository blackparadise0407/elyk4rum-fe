import { Component, Input } from '@angular/core';

import { Thread } from '$threads/shared/interfaces/threads.interface';

@Component({
  selector: 'app-popular-thread-card',
  templateUrl: './popular-thread-card.component.html',
})
export class PopularThreadCardComponent {
  @Input() thread!: Thread;
  constructor() {}
}
