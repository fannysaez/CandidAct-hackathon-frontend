import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { AuthHeader } from '../auth-header';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { OfferCardComponent } from '../../components/offer-card/offer-card.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { InformationsCardComponent } from '../../components/informations-card/informations-card.component';
import { ApplicationDetailsService } from '../../services/application-details.service';
import { Application } from '../../types/application';
import { DatePipe } from '@angular/common';


// const EMPTY_APPLICATION: Application = {
//   id: 0,
//   label: '',
//   applyDate: '',
//   description: null,
//   company: { id: 0, name: '', city: '' },
//   offer: null,
//   applicationMethod: null,
//   status: null,
// };

@Component({
  selector: 'app-details',
  imports: [
    AuthHeader,
    ApplicationCardComponent,
    OfferCardComponent,
    HistoryCardComponent,
    InformationsCardComponent
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
    ),
  );
}