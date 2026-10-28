import { Component, input, inject } from '@angular/core';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application } from '../../types/application';


@Component({
  selector: 'app-informations-card',
  imports: [],
  templateUrl: './informations-card.component.html',
  styleUrl: './informations-card.component.css'
})
export class InformationsCardComponent {
  private service = inject(ApplicationDetailsService);
  application = input.required<Application>();
}
