import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Alert } from '../../alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alerts-banner',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './alerts-banner.component.html',
})
export class AlertsBannerComponent {
  private service = inject(AlertService);

  readonly limit = 3;
  alerts: Alert[] = [];
  loading = true;
  error = false;
  showAll = false;

  constructor() {
    this.service.getAlerts().subscribe({
      next: (alerts) => {
        this.alerts = alerts;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  get displayed(): Alert[] {
    return this.showAll ? this.alerts : this.alerts.slice(0, this.limit);
  }
}