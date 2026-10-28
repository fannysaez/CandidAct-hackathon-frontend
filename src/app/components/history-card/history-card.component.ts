import { Component, computed, input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application } from '../../types/application';

@Component({
  selector: 'app-history-card',
  imports: [DatePipe],
  templateUrl: './history-card.component.html',
  styleUrl: './history-card.component.css'
})
export class HistoryCardComponent {
  private service = inject(ApplicationDetailsService);
  application = input.required<Application>();

  history = computed(() =>
    [...(this.application().applicationsStatus ?? [])].sort((a, b) =>
      b.updateDate.localeCompare(a.updateDate)
    )
  );
}