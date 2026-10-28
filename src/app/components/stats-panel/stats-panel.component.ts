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
      { label: 'Candidatures réalisées', value: this.stats?.sent ?? 0 },
      { label: 'Candidatures en attente', value: this.stats?.pending ?? 0 },
      { label: 'Candidatures à relancer', value: this.stats?.toRemind ?? 0 },
      { label: 'Candidatures totales', value: this.stats?.total ?? 0 },
    ];
  }
}