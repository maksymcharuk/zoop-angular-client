import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BackofficeComponent {
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
