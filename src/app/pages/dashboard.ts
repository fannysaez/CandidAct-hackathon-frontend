import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Application } from '../application';
import { ApplicationService, CreatedApplication } from '../application.service';
import { AuthService } from '../auth.service';
import { ApplicationSearchComponent } from '../components/application-search/application-search.component';
import { FormModalComponent } from '../components/form-modal/form-modal.component';
import { ApplicationFormComponent } from '../components/application-form/application-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe, ApplicationSearchComponent, FormModalComponent, ApplicationFormComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private service = inject(ApplicationService);
  private auth = inject(AuthService);
  private router = inject(Router);

  applications: Application[] = [];
  searchResults: Application[] | null = null;
  loading = true;
  error = false;
  page = 1;
  pageSize = 5;
  modalOpen = false;

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
    this.loadApplications();
  }

  loadApplications(): void {
    this.error = false;
  }

  get displayed(): Application[] {
    return this.searchResults ?? this.applications;
  }

  get totalPages(): number {
    return Math.ceil(this.displayed.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedApplications(): Application[] {
    const start = (this.page - 1) * this.pageSize;
    return this.displayed.slice(start, start + this.pageSize);
  }

  onResults(results: Application[] | null): void {
    this.searchResults = results;
    this.page = 1;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  onApplicationCreated(created: CreatedApplication): void {
    const application: Application = {
      id: created.id,
      company: created.company,
      jobTitle: created.jobTitle,
      status: created.status,
      applyDate: created.applyDate,
    };

    this.applications = [
      application,
      ...this.applications.filter((item) => item.id !== created.id),
    ];

    this.searchResults = null;
    this.page = 1;
    this.closeModal();
  }
}