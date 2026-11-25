import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../types/application';

@Injectable({
  providedIn: 'root'
})

export class ApplicationDetailsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/applications';

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

}
