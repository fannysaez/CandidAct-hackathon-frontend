import { Component, inject } from '@angular/core';
import { Stats } from '../../stats';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-stats-panel',
  standalone: true,
  templateUrl: './stats-panel.component.html',
})
export class StatsPanelComponent {
  private service = inject(StatsService);

  stats: Stats | null = null;
  loading = true;
  error = false;

  constructor() {
    this.service.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  get items(): { label: string; value: number }[] {
    return [
      { label: 'Candidatures envoyées', value: this.stats?.sent ?? 0 },
      { label: 'Envoyées cette semaine', value: this.stats?.thisWeek ?? 0 },
      { label: 'Entretiens', value: this.stats?.interviews ?? 0 },
      { label: 'Candidatures relancées', value: this.stats?.reminded ?? 0 },
    ];
  }
}