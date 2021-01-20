import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { OrderProduct } from '../../interfaces/order-product.inteface';
import { UpsertOrderProduct } from '../../interfaces/upsert-order-product.interface';
import { Cart } from '../../interfaces/cart.interface';

import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { UserService } from '../../../../shared/services/user/user.service';
import { TokenService } from '../../../../shared/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public create(order: any): Observable<any> {
    return this.http.post('/orders', order);
  }
}
