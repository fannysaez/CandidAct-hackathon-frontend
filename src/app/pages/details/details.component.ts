import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { OfferCardComponent } from '../../components/offer-card/offer-card.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { InformationsCardComponent } from '../../components/informations-card/informations-card.component';
import { ApplicationDetailsService } from '../../services/application-details.service';

@Component({
  selector: 'app-details',
  imports: [
    DatePipe,
    RouterLink,
    ApplicationCardComponent,
    OfferCardComponent,
    HistoryCardComponent,
    InformationsCardComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  private service = inject(ApplicationDetailsService);
  private route = inject(ActivatedRoute);

  application = toSignal(
    this.route.paramMap.pipe(
      switchMap(params =>
        this.service.getApplicationById(Number(params.get('id'))).pipe(
          catchError(() => of(null))
        )
      )
    )
  );
}