import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

import { AuthResponseDto, Token } from '../../interfaces';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get currentUser() {
    return this.tokenService.currentUser;
  }

  constructor(private tokenService: TokenService) {}

  isSeller() {
    return this.currentUser.seller;
  }

  isSignedIn() {
    return this.tokenService.isSignedIn();
  }

  isSignedOut() {
    return this.tokenService.isSignedOut();
  }
}
