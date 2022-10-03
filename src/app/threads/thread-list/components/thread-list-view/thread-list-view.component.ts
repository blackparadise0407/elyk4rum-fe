import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

import { Thread } from '$threads/thread-list/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/thread-list/shared/services/threads.service';

@Component({
  selector: 'app-thread-list-view',
  templateUrl: './thread-list-view.component.html',
})
export class ThreadListViewComponent implements OnInit {
  public threads$?: Observable<Thread[]>;

  constructor(
    public auth: AuthService,
    private threadsService: ThreadsService
  ) {}

  public ngOnInit(): void {
    this.threads$ = this.threadsService.getThreads();
  }

  public trackById(_: number, item: Thread) {
    return item.id;
  }
}
