import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

import { AuthResponseDto, Token } from '../../../interfaces';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public userIsSiggnedIn$: Subject<boolean> = new Subject();

  private _currentUser: any;

  get currentUser(): any {
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
    return this.http.post<AuthResponseDto>('/auth/register', data).pipe(
      tap(authResult => {
        this.setSession(authResult);
        this.userIsSiggnedIn$.next(true);
      }),
      shareReplay()
    );
  }

  signIn(data: {
    email: string;
    password: string;
  }): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`/auth/login`, data).pipe(
      tap(authResult => {
        this.setSession(authResult);
        this.userIsSiggnedIn$.next(true);
      }),
      shareReplay()
    );
  }

  signInSeller(data: {
    email: string;
    password: string;
  }): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`/auth/login-seller`, data).pipe(
      tap(authResult => {
        this.setSession(authResult);
        this.userIsSiggnedIn$.next(true);
      }),
      shareReplay()
    );
  }

  signOut(): Observable<{}> {
    return of({}).pipe(
      tap(() => {
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('exp');
        this.localStorage.removeItem('user');
        this.userIsSiggnedIn$.next(false);
      }),
      shareReplay()
    );
  }

  isSignedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isSignedOut(): boolean {
    return !this.isSignedIn();
  }

  getExpiration(): moment.Moment {
    const exp = JSON.parse(this.localStorage.getItem('exp'));
    return moment(+exp);
  }

  private setSession(authResult: AuthResponseDto): void {
    const decodedToken: Token = jwtDecode(authResult.token);
    const exp = moment().add(decodedToken.exp - Date.now() / 1000, 'second');

    this._currentUser = {
      email: decodedToken.email,
      seller: decodedToken.seller
    };

    this.localStorage.setItem('token', authResult.token);
    this.localStorage.setItem('exp', JSON.stringify(exp.valueOf()));
    this.localStorage.setItem('user', this._currentUser);
  }
}
