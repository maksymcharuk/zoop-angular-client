import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/backoffice/orders');
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`/backoffice/orders/${id}`);
  }

  createOrder(data: any): Observable<Order> {
    return this.http.post<Order>('/backoffice/orders', data);
  }

  updateOrder(id: string, data: any): Observable<Order> {
    return this.http.put<Order>(`/backoffice/orders/${id}`, data);
  }

  removeOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(`/backoffice/orders/${id}`);
  }
}
