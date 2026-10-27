
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError
} from 'rxjs/operators';

import { Application } from '../../types/application';
import { ApplicationSearchService } from '../../services/application-search.service';

@Component({
  selector: 'app-application-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './application-search.component.html'
})
export class ApplicationSearchComponent {
  private applicationService = inject(ApplicationSearchService);
  private searchTerms = new Subject<string>();

  searchTerm = '';
  applications: Application[] = [];
  loading = false;
  error = '';

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term) {
          this.loading = false;
          this.error = '';
          return of([]);
        }

        this.loading = true;
        this.error = '';

        return this.applicationService.searchApplications(term).pipe(
          catchError(() => {
            this.error = 'Pas de candidature correspondante';
            return of([]);
          })
        );
      })
    ).subscribe(applications => {
      this.applications = applications;
      this.loading = false;
    });
  }

  onSearch(term: string): void {
    const value = term.trim();

    if (!value) {
      this.applications = [];
      this.error = '';
      this.loading = false;
      this.searchTerms.next('');
      return;
    }

    this.searchTerms.next(value);
  }
}
