import { Component } from '@angular/core';
import { AuthHeader } from '../auth-header';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { OfferCardComponent } from '../../components/offer-card/offer-card.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { InformationsCardComponent } from '../../components/informations-card/informations-card.component';

@Component({
  selector: 'app-details',
  imports: [AuthHeader, ApplicationCardComponent, OfferCardComponent, HistoryCardComponent, InformationsCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  // application = input.required<Application>();
}
