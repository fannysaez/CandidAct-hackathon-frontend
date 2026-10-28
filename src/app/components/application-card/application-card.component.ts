import { Component, input, inject } from '@angular/core';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application } from '../../types/application';

@Component({
  selector: 'app-application-card',
  imports: [],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  private service = inject(ApplicationDetailsService);
  application = input.required<Application>();
}
