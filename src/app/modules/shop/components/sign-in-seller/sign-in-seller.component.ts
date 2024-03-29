import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from '../../../../shared/services/authentication/authentication.service';
import { AlertsService } from '../../../../shared/services/alerts/alerts.service';

@Component({
  selector: 'app-sign-in-seller',
  templateUrl: './sign-in-seller.component.html',
  styleUrls: ['./sign-in-seller.component.scss']
})
export class SignInSellerComponent implements OnInit {
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
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(queryParams => {
      this.returnUrl = queryParams.returnUrl;
    });
  }

  get emailCtrl(): AbstractControl {
    return this.signInForm.get('email');
  }

  get passwordCtrl(): AbstractControl {
    return this.signInForm.get('password');
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.emailCtrl.markAsTouched();
      this.passwordCtrl.markAsTouched();
      return;
    }

    this.submitButton.nativeElement.setAttribute('disabled', true);

    this.authService
      .signInSeller({
        email: this.emailCtrl.value,
        password: this.passwordCtrl.value
      })
      .subscribe(
        res => {
          this.returnUrl
            ? this.router.navigate([this.returnUrl])
            : this.router.navigate(['backoffice']);
        },
        (err: HttpErrorResponse) => {
          this.submitButton.nativeElement.removeAttribute('disabled');
          this.alertService.showAlertDanger(err.message);
        }
      );
  }
}
