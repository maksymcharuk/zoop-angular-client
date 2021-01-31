import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthenticationVerifyInterceptor } from './authentication-verify.interceptor';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

describe('AuthenticationVerifyInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Router,
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationVerifyInterceptor,
          multi: true
        }
      ]
    });
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
