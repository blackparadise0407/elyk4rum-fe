import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Category } from 'src/app/admin/shared/interfaces/categories.interface';
import { CategoriesService } from 'src/app/admin/shared/services/categories.service';

import { Thread } from '$threads/thread-list/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/thread-list/shared/services/threads.service';

@Component({
  selector: 'app-thread-list-view',
  templateUrl: './thread-list-view.component.html',
})
export class ThreadListViewComponent implements OnInit {
  public threads$?: Observable<Thread[]>;
  public categories$?: Observable<Category[]>;

  constructor(
    public auth: AuthService,
    private threadsService: ThreadsService,
    private categoriesService: CategoriesService
  ) {}

  public ngOnInit(): void {
    this.threads$ = this.threadsService.getThreads();
    this.categories$ = this.categoriesService.getAll();
  }

  public trackById(_: number, item: Thread) {
    return item.id;
  }
}
