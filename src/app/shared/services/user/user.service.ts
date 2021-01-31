import { Injectable } from '@angular/core';

import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: Add specific type for User
  get currentUser(): any {
    return this.tokenService.currentUser;
  }

  constructor(private tokenService: TokenService) {}

  // TODO: Add specific type for User
  public isSeller(): any {
    return this.currentUser && this.currentUser.seller;
  }

  public isSignedIn(): boolean {
    return this.tokenService.isSignedIn();
  }

  public isSignedOut(): boolean {
    return this.tokenService.isSignedOut();
  }
}
