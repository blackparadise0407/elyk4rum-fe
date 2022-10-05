import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/admin/shared/interfaces/categories.interface';
import { CategoriesService } from 'src/app/admin/shared/services/categories.service';

import { Thread } from '$threads/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/shared/services/threads.service';

import { QueryParamsService } from './../../../shared/services/query-params.service';

interface ThreadListViewQuery {
  page: number;
}
@Component({
  selector: 'app-thread-list-view',
  templateUrl: './thread-list-view.component.html',
})
export class ThreadListViewComponent implements OnInit, OnDestroy {
  public threads$?: Observable<Thread[]>;
  public categories$?: Observable<Category[]>;
  public query$!: Observable<ThreadListViewQuery>;
  private stop$ = new Subject<void>();

  constructor(
    public auth: AuthService,
    private threadsService: ThreadsService,
    private categoriesService: CategoriesService,
    private queryParamsService: QueryParamsService<{
      page: number;
    }>
  ) {}

  public ngOnInit(): void {
    this.threads$ = this.threadsService.getThreads();
    this.categories$ = this.categoriesService.getAll();
    this.query$ = this.queryParamsService.queryParams$;
  }

  public ngOnDestroy(): void {
    this.queryParamsService.clear();
    this.stop$.next();
    this.stop$.complete();
  }

  public trackById(_: number, item: Thread) {
    return item.id;
  }

  public handleChangePage(page: number) {
    this.queryParamsService.updateQueryParams({
      page,
    });
  }
}
