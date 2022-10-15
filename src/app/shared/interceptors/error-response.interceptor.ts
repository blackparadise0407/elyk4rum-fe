import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';

import { CustomHttpError } from '$shared/interfaces/http.interface';
import { ToastService } from '$shared/services/toast.service';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}
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
          const httpError = err.error as CustomHttpError;
          const errMessage = httpError.error || err.message;
          this.toastService.enqueue(errMessage, {
            variant: 'error',
          });

          return EMPTY;
        }
        return throwError(() => err);
      })
    );
  }
}
