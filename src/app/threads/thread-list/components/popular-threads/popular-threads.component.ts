import { Component } from '@angular/core';

import { Thread } from '$threads/thread-list/shared/interfaces/threads.interface';

@Component({
  selector: 'app-popular-threads',
  templateUrl: './popular-threads.component.html',
})
export class PopularThreadsComponent {
  public threads: Thread[] = [];
  constructor() {}
}
