import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

import { User } from '../interfaces/users.interface';

const EMPTY_USER = { id: '', email: '', avatarUrl: '', auth0Id: '' };

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: Record<string, Observable<User>> = {};
  constructor(private http: HttpClient) {}

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
        map((user) => user),
        catchError(() => of(EMPTY_USER)),
        shareReplay(1)
      ));
  }
}
