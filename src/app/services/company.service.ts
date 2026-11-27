import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Company } from '../types/application';
import { API_URL } from '../api_url';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Company[]> {
    return this.http.get<unknown>(`${API_URL}/api/companies`).pipe(
      map((response) => {
        const data = response as {
          member?: Company[];
          'hydra:member'?: Company[];
        } | Company[];

        if (Array.isArray(data)) {
          return data;
        }

        return data.member ?? data['hydra:member'] ?? [];
      }),
    );
  }
}