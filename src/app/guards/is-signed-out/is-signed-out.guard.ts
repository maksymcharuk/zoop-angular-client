import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { TokenService } from '../../shared/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedOutGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(): boolean {
    return this.tokenService.isSignedOut();
  }
}
