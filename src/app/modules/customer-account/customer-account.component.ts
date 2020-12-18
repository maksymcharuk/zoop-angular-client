import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerAccountComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  public signOut() {
    this.authService.signOut().subscribe(
      (res) => this.router.navigate(['/']),
      (error) => this.router.navigate(['/'])
    );
  }
}
