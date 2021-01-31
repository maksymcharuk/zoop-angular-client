import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/backoffice/products');
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/backoffice/products/${id}`);
  }

  createProduct(data: any): Observable<Product> {
    return this.http.post<Product>('/backoffice/products', data);
  }

  updateProduct(id: string, data: any): Observable<Product> {
    return this.http.put<Product>(`/backoffice/products/${id}`, data);
  }

  removeProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`/backoffice/products/${id}`);
  }
}
