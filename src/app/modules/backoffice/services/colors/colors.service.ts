import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Color } from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>('/backoffice/colors');
  }

  getColorById(id: string): Observable<Color> {
    return this.http.get<Color>(`/backoffice/colors/${id}`);
  }

  createColor(data: any): Observable<Color> {
    return this.http.post<Color>('/backoffice/colors', data);
  }

  updateColor(id: string, data: any): Observable<Color> {
    return this.http.put<Color>(`/backoffice/colors/${id}`, data);
  }

  removeColor(id: string): Observable<Color> {
    return this.http.delete<Color>(`/backoffice/colors/${id}`);
  }
}
