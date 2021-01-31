import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  NgForm,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { AlertsService } from '../../../../shared/services/alerts/alerts.service';
import { TokenService } from './../../../../shared/services/token/token.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpFormRef') signUpFormRef: NgForm;
  @ViewChild('submitButton') submitButton: ElementRef;

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: [this.passwordValidator] }
    );
  }

  get emailCtrl(): AbstractControl {
    return this.signUpForm.get('email');
  }

  get passwordCtrl(): AbstractControl {
    return this.signUpForm.get('password');
  }

  get confirmPasswordCtrl(): AbstractControl {
    return this.signUpForm.get('confirmPassword');
  }

  passwordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword
      ? null
      : {
          passwordValidator: true
        };
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.emailCtrl.markAsTouched();
      this.passwordCtrl.markAsTouched();
      this.confirmPasswordCtrl.markAsTouched();
      return;
    }

    this.submitButton.nativeElement.setAttribute('disabled', true);

    this.tokenService
      .registerAccount({
        email: this.emailCtrl.value,
        password: this.passwordCtrl.value
      })
      .subscribe(
        () => {
          this.router.navigate(['customer-account']);
        },
        err => {
          this.alertService.showAlertDanger(err.error.message);
          this.submitButton.nativeElement.removeAttribute('disabled');
        }
      );
  }
}
