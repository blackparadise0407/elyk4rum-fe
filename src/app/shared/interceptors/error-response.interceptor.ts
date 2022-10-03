import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          return event;
        }
        return event;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 0:
              console.log('Network error');
              break;
            default:
              break;
          }
        }
        return throwError(() => err);
      })
    );
  }
}
