import { Component, input, inject } from '@angular/core';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application, Offer } from '../../types/application';

@Component({
  selector: 'app-offer-card',
  imports: [],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent {
  private service = inject(ApplicationDetailsService);
  application = input.required<Application>();
  offer = input.required<Offer>();
}