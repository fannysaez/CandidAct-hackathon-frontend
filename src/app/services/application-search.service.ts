import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSearchService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/applications';

  searchApplications(term: string): Observable<Application[]> {
    const params = new HttpParams().set('search', term);

    return this.http.get<Application[]>(this.apiUrl, { params });
  }
}
