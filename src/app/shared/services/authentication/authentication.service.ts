import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private tokenService: TokenService) {}

  signIn(data: { email: string; password: string }): Observable<any> {
    return this.tokenService.signIn(data);
  }

  signInSeller(data: { email: string; password: string }): Observable<any> {
    return this.tokenService.signInSeller(data);
  }

  signOut(): Observable<any> {
    return this.tokenService.signOut();
  }
}
