import { Component, input, inject } from '@angular/core';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application } from '../../types/application';

@Component({
  selector: 'app-history-card',
  imports: [],
  templateUrl: './history-card.component.html',
  styleUrl: './history-card.component.css'
})
export class HistoryCardComponent {
  private service = inject(ApplicationDetailsService);
  application = input.required<Application>();
}
