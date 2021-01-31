import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/backoffice/categories');
  }

  getSuitableParents(id?: string): Observable<Category[]> {
    const params = {
      id: null,
    };

    if (id) {
      params.id = id;
    }

    return this.http.get<Category[]>(
      '/backoffice/categories-filtered/all-suitable-parents',
      { params }
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`/backoffice/categories/${id}`);
  }

  createCategory(data: any): Observable<Category> {
    return this.http.post<Category>('/backoffice/categories', data);
  }

  updateCategory(id: string, data: any): Observable<Category> {
    return this.http.put<Category>(`/backoffice/categories/${id}`, data);
  }

  removeCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`/backoffice/categories/${id}`);
  }
}
