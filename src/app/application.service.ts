import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Application } from './application';

export interface CreateOfferPayload {
  jobTitle: string;
  contractType?: string | null;
  description: string;
  url?: string | null;
  publicationDate: string;
  expirationDate?: string | null;
}

export interface CreateApplicationPayload {
  label: string;
  applyDate: string;
  companyId: number;
  applicationMethodId?: number | null;
  description?: string | null;
  offer?: CreateOfferPayload | null;
}

export interface CreatedApplication {
  id: number;
  label: string;
  jobTitle: string;
  company: string;
  status: string;
  applyDate: string;
  offer?: {
    id: number;
    jobTitle: string;
    contractType: string | null;
    publicationDate: string;
    expirationDate: string | null;
  } | null;
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
      payload
    );
  }
}