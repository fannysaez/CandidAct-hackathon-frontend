import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { AuthService } from '../auth.service';
import { ApplicationSearchComponent } from '../components/application-search/application-search.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe, ApplicationSearchComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private service = inject(ApplicationService);
  private auth = inject(AuthService);
  private router = inject(Router);

  applications: Application[] = [];
  loading = true;
  error = false;
  page = 1;
  pageSize = 5;

  constructor() {
    this.service.getAll().subscribe({
      next: (list) => {
        this.applications = list;
        this.loading = false;
      },
      error: (e) => {
        if (e.status === 401) {
          this.logout();
        }
        this.error = true;
        this.loading = false;
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.applications.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedApplications(): Application[] {
    const start = (this.page - 1) * this.pageSize;
    return this.applications.slice(start, start + this.pageSize);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}