import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogProduct } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<CatalogProduct[]> {
    return this.http.get<CatalogProduct[]>('/catalog/products');
  }

  public getProduct(id: string): Observable<CatalogProduct> {
    return this.http.get<CatalogProduct>(`/catalog/product/${id}`);
  }
}
