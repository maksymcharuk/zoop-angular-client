import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Product } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/products/${id}`);
  }
}
