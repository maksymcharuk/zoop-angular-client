import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderProduct } from '../../interfaces/order-product.inteface';

@Injectable({
  providedIn: 'root'
})
export class OrderCalculationsService {
  private baseUrl = '/order-calculations';

  constructor(private http: HttpClient) {}

  public getTotalPrice(orderProducts: OrderProduct[]): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/total-price`, orderProducts);
  }
}
