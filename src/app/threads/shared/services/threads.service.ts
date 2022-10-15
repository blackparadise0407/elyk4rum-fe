import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { CategoriesService } from 'src/app/admin/shared/services/categories.service';

import { SharedService } from '$shared/services/shared.service';

import { CreateThreadDto, Thread } from '../interfaces/threads.interface';

@Injectable()
export class ThreadsService {
  private threadsUrl = 'api/threads';

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private categoriesService: CategoriesService
  ) {}

  public getThreads() {
    return this.http.get<Thread[]>(this.threadsUrl).pipe(
      withLatestFrom(this.categoriesService.getEntities()),
      mergeMap(([threads, categories]) =>
        forkJoin(
          threads.map((thread) => {
            thread.categoryInfo = categories[thread.category];
            return this.sharedService
              .getUserInfo(thread.createdBy as string)
              .pipe(
                map((user) => {
                  thread.createdByInfo = user;
                })
              );
          })
        ).pipe(map(() => threads))
      )
    );
  }

  public getThreadBySlug(slug: string) {
    return this.http.get<Thread>(`${this.threadsUrl}/${slug}`).pipe(
      switchMap((thread) =>
        this.sharedService.getUserInfo(thread.createdBy as string).pipe(
          withLatestFrom(this.categoriesService.getOne(thread.category)),
          map(([user, category]) => {
            thread.createdByInfo = user;
            thread.categoryInfo = category;
            return thread;
          })
        )
      )
    );
  }

  public create(payload: CreateThreadDto) {
    const path = `${this.threadsUrl}`;
    return this.http.post<Thread>(path, payload);
  }
}
