import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthJWTService } from '../services/auth.jwt/auth.jwt.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthJWTService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('ErrorInterceptor - Intercept()');
    return next.handle(request).pipe(
      catchError(err => {
        console.log('catch error');
        console.log(err.status);

        switch (err.status) {
          // auto logout if 401 response returned from api
          case 401:
            this.authenticationService.logout();
            location.reload(true);
            break;
        }
        const error = err.error.message || err.statusText;
        console.log(error);
        return throwError(error);
      })
    );
  }
}
