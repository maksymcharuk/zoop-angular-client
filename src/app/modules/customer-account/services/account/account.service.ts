import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccount(): Observable<any> {
    return this.http.get('/customer-account/account');
  }

  updateAccount(data): Observable<any> {
    return this.http.put(`/customer-account/account`, data);
  }
}
