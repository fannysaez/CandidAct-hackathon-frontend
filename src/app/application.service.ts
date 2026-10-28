import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Application } from './application';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);

  getAll(): Observable<Application[]> {
    return this.http
      .get<any>('/api/applications')
      .pipe(map((r) => (Array.isArray(r) ? r : r.member ?? r['hydra:member'] ?? []) as Application[]));
  }
}