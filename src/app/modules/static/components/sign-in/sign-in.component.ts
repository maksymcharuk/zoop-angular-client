import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { AlertsService } from '../../../../services/alerts/alerts.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @ViewChild('submitButton') submitButton: ElementRef;

  signInForm: FormGroup;

  private returnUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.returnUrl = queryParams.returnUrl;
    });
  }

  get emailCtrl() {
    return this.signInForm.get('email');
  }

  get passwordCtrl() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      this.emailCtrl.markAsTouched();
      this.passwordCtrl.markAsTouched();
      return;
    }

    this.submitButton.nativeElement.setAttribute('disabled', true);

    this.authService
      .signIn({
        email: this.emailCtrl.value,
        password: this.passwordCtrl.value,
      })
      .subscribe(
        (res) => {
          this.returnUrl
            ? this.router.navigate([this.returnUrl])
            : this.router.navigate(['customer-account']);
          this.router.navigate(['customer-account']);
        },
        (err) => {
          this.submitButton.nativeElement.removeAttribute('disabled');
          this.alertService.showAlertDanger(err.message);
        }
      );
  }
}
