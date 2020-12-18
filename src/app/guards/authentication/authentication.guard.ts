import { UserService } from './../../services/user/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.currentUser;
    const isSignedIn = this.userService.isSignedIn();
    const params = {
      queryParams: { returnUrl: state.url },
    };

    if (isSignedIn && currentUser) {
      // check if route is restricted by role
      if (route.data.seller && !currentUser.seller) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    state.url.includes('backoffice')
      ? this.router.navigate(['/sign-in-seller'], params)
      : this.router.navigate(['/sign-in'], params);

    return false;
  }
}
