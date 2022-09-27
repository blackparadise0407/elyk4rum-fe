import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpWrapperOptions } from '$shared/interfaces/http.interface';

@Injectable({ providedIn: 'root' })
export class HttpWrapper {
  constructor(private readonly httpClient: HttpClient) {}

  public get<T>(
    url: string,
    options: HttpWrapperOptions = {},
    showError = true
  ) {
    return this.httpClient.get(url, options).pipe(
      map((response) => response as T),
      catchError((response) => throwError(() => response))
    ) as Observable<T>;
  }

  // public post<T>(
  //   url: string,
  //   options: HttpWrapperOptions = {},
  //   showError = true
  // ) {
  //   return this.httpClient.post(url, options).pipe(
  //     catchError((response) => {
  //       if (!showError) {
  //         return throwError(() => response);
  //       }
  //       return this.handleErrorResponse(response);
  //     })
  //   ) as Observable<T>;
  // }

  // public patch<T>(
  //   url: string,
  //   options: HttpWrapperOptions = {},
  //   showError = true
  // ) {
  //   return this.httpClient.patch(url, options).pipe(
  //     catchError((response) => {
  //       if (!showError) {
  //         return throwError(() => response);
  //       }
  //       return this.handleErrorResponse(response);
  //     })
  //   ) as Observable<T>;
  // }

  // public delete<T>(
  //   url: string,
  //   options: HttpWrapperOptions = {},
  //   showError = true
  // ) {
  //   return this.httpClient.delete(url, options).pipe(
  //     catchError((response) => {
  //       if (!showError) {
  //         return throwError(() => response);
  //       }
  //       return this.handleErrorResponse(response);
  //     })
  //   ) as Observable<T>;
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleErrorResponse(response: any) {
    return throwError(() => response);
  }
}
