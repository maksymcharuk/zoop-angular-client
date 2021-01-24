import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AccountService } from './../../services/account/account.service';

@Component({
  selector: 'customer-account-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public account;
  public accountForm: FormGroup;
  public loading = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      email: [],
      firstName: [],
      lastName: [],
      phoneNumber: [],
      address: this.fb.group({
        addr1: [],
        city: [],
        state: [],
        country: [],
      }),
    });

    this.accountService.getAccount().subscribe((account) => {
      this.account = account;
      this.accountForm.patchValue(account);
      this.loading = false;
    });
  }

  onSubmit() {
    this.loading = true;
    this.accountService.updateAccount(this.accountForm.value).subscribe(() => {
      this.loading = false;
    });
  }
}
