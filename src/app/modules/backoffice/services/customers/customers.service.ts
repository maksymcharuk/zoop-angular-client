import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  // getCustomers(): Observable<any> {
  //   return this.http.get(`/accounts/${this.accountId}/customers`);
  // }

  // createCustomer(data: { name: string }): Observable<any> {
  //   return this.http.post(`/accounts/${this.accountId}/customers`, data);
  // }
}
