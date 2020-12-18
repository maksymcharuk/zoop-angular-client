import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/products');
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  createProduct(data: any) {
    return this.http.post<Product>('/products', data);
  }

  updateProduct(id: string, data: any) {
    return this.http.put<Product>(`/products/${id}`, data);
  }

  removeProduct(id: string) {
    return this.http.delete<Product>(`/products/${id}`);
  }
}
