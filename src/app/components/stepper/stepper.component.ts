
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  @Input() currentStep = 1;
  @Input() showOfferStep = true;

  get steps(): { number: number; label: string }[] {
    return this.showOfferStep
      ? [
        { number: 1, label: 'Candidature' },
        { number: 2, label: 'Offre' },
      ]
      : [{ number: 1, label: 'Candidature' }];
  }
}
