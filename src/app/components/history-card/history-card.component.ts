import { Component, computed, input, inject } from '@angular/core';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application } from '../../types/application';
import { DatePipe } from '@angular/common';

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
    [...(this.application().applicationStatus ?? [])].sort((a, b) =>
      new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime())
  );
}
