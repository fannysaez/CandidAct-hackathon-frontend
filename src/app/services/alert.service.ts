import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private http = inject(HttpClient);

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>('/api/alerts');
  }
}