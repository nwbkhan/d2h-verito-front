import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqUrl = environment.apiBaseUrl;
    const token = localStorage.getItem('token');
    req = req.clone({
      url: reqUrl + '' + req.url
    });
    if (token) {
      req = req.clone({
        setHeaders: {
          token
        },
      });
    }
    return next.handle(req);
  }
}
