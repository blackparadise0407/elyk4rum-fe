import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap } from 'rxjs';
import { UsersService } from 'src/app/users/shared/services/users.service';

import { Thread } from '../interfaces/threads.interface';

@Injectable()
export class ThreadsService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  public getThreads() {
    return this.http.get<Thread[]>('api/threads').pipe(
      mergeMap((threads) =>
        forkJoin(
          threads.map((thread) => {
            return this.usersService
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
}
