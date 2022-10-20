import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CategoriesService } from 'src/app/admin/shared/services/categories.service';

import { OutputData } from '$shared/interfaces/editorjs.interface';
import { SharedService } from '$shared/services/shared.service';

import { CreateThreadDto, Thread } from '../interfaces/threads.interface';

@Injectable()
export class ThreadsService {
  public editorData$ = new BehaviorSubject<OutputData | null>(null);
  private editedThread = new BehaviorSubject<Thread | null>(null);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public editedThread$ = this.editedThread.asObservable();
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

  public getDraftThreadById(threadId: string) {
    const path = `${this.threadsUrl}/draft/${threadId}`;
    return this.http.get<Thread>(path);
  }

  public loadDraftThread(threadId: string) {
    return this.getDraftThreadById(threadId).pipe(
      tap((thread) => {
        this.editedThread.next(thread);
      })
    );
  }

  public archive(threadId: string) {
    const path = `${this.threadsUrl}/${threadId}/archived`;
    return this.http.patch<Thread>(path, undefined);
  }

  public create(payload: CreateThreadDto) {
    const path = `${this.threadsUrl}`;
    return this.http.post<Thread>(path, payload);
  }

  public clearData() {
    this.editorData$.next(null);
    this.editedThread.next(null);
  }
}
