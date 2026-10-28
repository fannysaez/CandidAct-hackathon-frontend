import { Component, inject, OnInit } from '@angular/core';
import { AuthHeader } from '../auth-header';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { OfferCardComponent } from '../../components/offer-card/offer-card.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { InformationsCardComponent } from '../../components/informations-card/informations-card.component';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [AuthHeader, ApplicationCardComponent, OfferCardComponent, HistoryCardComponent, InformationsCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private service = inject(ApplicationDetailsService);
  private route = inject(ActivatedRoute);

  application = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.service.getApplicationById(id);
      })
    )
  );
}
