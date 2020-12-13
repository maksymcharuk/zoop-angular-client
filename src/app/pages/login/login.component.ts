import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  get usernameCtrl(): AbstractControl {
    return this.loginForm.get('username');
  }

  get passwordCtrl(): AbstractControl {
    return this.loginForm.get('password');
  }

  get confirmPasswordCtrl(): AbstractControl {
    return this.loginForm.get('confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordValidator }
    );
  }

  passwordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword
      ? null
      : {
          passwordValidator: true,
        };
  }

  onSubmit() {
    this.authService
      .login(this.usernameCtrl.value, this.passwordCtrl.value)
      .subscribe(() => {
        this.router.navigate(['customer']);
      });
  }
}
