import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Application } from './application';

export interface CreateApplicationPayload {
  label: string;
  applyDate: string;
  companyId: number;
  applicationMethodId?: number | null;
  description?: string | null;
}

export interface CreatedApplication {
  id: number;
  label: string;
  jobTitle: string;
  company: string;
  status: string;
  applyDate: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);

  getAll(): Observable<Application[]> {
    return this.http
      .get<any>('/api/applications')
      .pipe(map((r) => (Array.isArray(r) ? r : r.member ?? r['hydra:member'] ?? []) as Application[]));
  }

  create(payload: CreateApplicationPayload): Observable<CreatedApplication> {
    return this.http.post<CreatedApplication>(
      '/api/applications',
      payload,
    );
  }
}