import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../stats';
import { API_URL } from '../api_url';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private http = inject(HttpClient);

  getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${API_URL}/api/stats`);
  }
}