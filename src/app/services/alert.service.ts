import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../alert';
import { API_URL } from '../api_url';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private http = inject(HttpClient);

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${API_URL}/api/alerts`);
  }
}