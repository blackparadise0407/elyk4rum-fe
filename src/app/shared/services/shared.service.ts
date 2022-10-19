import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs';
import { User } from 'src/app/users/shared/interfaces/users.interface';

const EMPTY_USER = { id: '', email: '', avatarUrl: '', auth0Id: '' } as User;

@Injectable({ providedIn: 'root' })
export class SharedService {
  private savedThreads = new BehaviorSubject<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public savedThreads$ = this.savedThreads.asObservable();
  private users: Record<string, Observable<User>> = {};

  constructor(private authService: AuthService, private http: HttpClient) {}

  public getUserInfo(userId: string) {
    if (!userId) {
      return of(EMPTY_USER);
    }
    return this.users[userId] ?? this.getUser(userId);
  }

  public getUser(userId: string) {
    return (this.users[userId] = this.http
      .get<User>(`api/users/${userId}`)
      .pipe(
        withLatestFrom(this.authService.getUser()),
        map(([user, currentUser]) => {
          if (user.auth0Id === currentUser?.sub) {
            this.savedThreads.next(user.savedThreads);
          }
          return user;
        }),
        catchError(() => of(EMPTY_USER)),
        shareReplay(1)
      ));
  }

  public saveOrUnsaveThread(threadId: string) {
    return this.http
      .patch<User>('api/users/save-thread', {
        threadId,
      })
      .pipe(
        tap((user) => {
          this.savedThreads.next(user.savedThreads);
        })
      );
  }
}
