import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

import { AuthResponseDto, Token } from '../../../interfaces';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _currentUser;

  get currentUser() {
    return this._currentUser || this.localStorage.getItem('user');
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  registerAccount(data: {
    email: string;
    password: string;
  }): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>('/auth/register', data)
      .pipe(tap(this.setSession.bind(this)), shareReplay());
  }

  signIn(data: {
    email: string;
    password: string;
  }): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`/auth/login`, data)
      .pipe(tap(this.setSession.bind(this)), shareReplay());
  }

  signInSeller(data: {
    email: string;
    password: string;
  }): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`/auth/login-seller`, data)
      .pipe(tap(this.setSession.bind(this)), shareReplay());
  }

  signOut() {
    return of({}).pipe(
      tap(() => {
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('exp');
        this.localStorage.removeItem('user');
      }),
      shareReplay()
    );
  }

  isSignedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isSignedOut() {
    return !this.isSignedIn();
  }

  getExpiration() {
    const exp = JSON.parse(this.localStorage.getItem('exp'));
    return moment(+exp);
  }

  private setSession(authResult: AuthResponseDto) {
    const decodedToken: Token = jwtDecode(authResult.token);
    const exp = moment().add(decodedToken.exp - Date.now() / 1000, 'second');

    this._currentUser = {
      email: decodedToken.email,
      seller: decodedToken.seller,
    };

    this.localStorage.setItem('token', authResult.token);
    this.localStorage.setItem('exp', JSON.stringify(exp.valueOf()));
    this.localStorage.setItem('user', this._currentUser);
  }
}
