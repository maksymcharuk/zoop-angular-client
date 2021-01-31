import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AbstractProductsService {
  private baseUrl = '/backoffice';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/abstract-products`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/abstract-products/${id}`);
  }

  create(data: any): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/abstract-products`, data);
  }

  update(id: string, data: any): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}/abstract-products/${id}`,
      data
    );
  }

  remove(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/abstract-products/${id}`);
  }
}
