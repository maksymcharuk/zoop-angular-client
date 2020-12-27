import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Injectable()
export class AuthenticationVerifyInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authService.signOut();
            this.router.url.includes('backoffice') ||
            this.router.url.includes('sign-in-seller')
              ? this.router.navigate(['/sign-in-seller'])
              : this.router.navigate(['/sign-in']);
          }

          return throwError(error);
        }
      })
    );
  }
}
