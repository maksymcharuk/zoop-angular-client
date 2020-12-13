import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { AuthResponseDto } from '../../../app/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`${environment.apiBaseUrl}/auth/register`, {
        email,
        password,
      })
      .pipe(tap(this.setSession), shareReplay());
  }

  login(username: string, password: string): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`${environment.apiBaseUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(tap(this.setSession), shareReplay());
  }

  logout() {
    return of({}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('exp');
      })
    );
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const exp = JSON.parse(localStorage.getItem('exp'));
    return moment(exp);
  }

  private setSession(authResult: AuthResponseDto) {
    const decodedToken: JwtPayload = jwtDecode(authResult.token);
    const exp = moment().add(decodedToken.exp - Date.now() / 1000, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('exp', JSON.stringify(exp.valueOf()));
  }
}
