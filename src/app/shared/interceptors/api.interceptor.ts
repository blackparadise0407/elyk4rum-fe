import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (['api', '/api'].some((prefix) => req.url.startsWith(prefix))) {
      const parsedUrl =
        req.url.charAt(0) === '/' ? req.url.substring(1) : req.url;
      const apiReq = req.clone({
        url: `${environment.apiUrl}/${parsedUrl}`,
      });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
