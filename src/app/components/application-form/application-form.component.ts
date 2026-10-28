import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { StepperComponent } from '../stepper/stepper.component';
import { CompanyService } from '../../services/company.service';
import { ApplicationMethodService } from '../../services/application-method.service';
import {
  ApplicationService,
  CreatedApplication,
  CreateApplicationPayload,
} from '../../application.service';
import { Company, ApplicationMethod } from '../../types/application';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModalComponent,
    StepperComponent,
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css',
})
export class ApplicationFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly companyService = inject(CompanyService);
  private readonly methodService = inject(ApplicationMethodService);
  private readonly applicationService = inject(ApplicationService);

  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<CreatedApplication>();

  companies: Company[] = [];
  applicationMethods: ApplicationMethod[] = [];

  loadingCompanies = false;
  loadingMethods = false;

  currentStep = 1;
  addingOffer = false;
  loading = false;
  errorMessage = '';

  readonly form = this.fb.group({
    label: ['', Validators.required],
    companyId: ['', Validators.required],
    city: [''],
    applyDate: ['', Validators.required],
    applicationMethodId: [''],
    description: [''],
  });

  readonly offerForm = this.fb.group({
    jobTitle: ['', Validators.required],
    contractType: [''],
    description: ['', Validators.required],
    publicationDate: ['', Validators.required],
    expirationDate: [''],
    url: ['', Validators.pattern(/^https?:\/\/.+/i)],
  });

  get modalTitle(): string {
    return this.addingOffer
      ? 'Ajouter une candidature et une offre'
      : 'Ajouter une candidature';
  }

  ngOnInit(): void {
    this.loadingCompanies = true;

    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.companies = companies;
        this.loadingCompanies = false;
      },
      error: () => {
        this.loadingCompanies = false;
        this.errorMessage =
          'Impossible de charger les entreprises. Veuillez réessayer.';
      },
    });

    this.loadingMethods = true;

    this.methodService.getAll().subscribe({
      next: (methods) => {
        this.applicationMethods = methods;
        this.loadingMethods = false;
      },
      error: () => {
        this.loadingMethods = false;
        this.errorMessage =
          'Impossible de charger les méthodes de candidature.';
      },
    });
  }

  onCompanyChange(): void {
    const companyId = Number(this.form.controls.companyId.value);

    const company = this.companies.find(
      (item) => item.id === companyId,
    );

    this.form.controls.city.setValue(company?.city ?? '');
  }

  nextStep(): void {
    if (this.loading) {
      return;
    }

    this.errorMessage = '';

    const fields = ['label', 'companyId', 'applyDate'] as const;

    fields.forEach((field) => {
      this.form.controls[field].markAsTouched();
    });

    if (fields.some((field) => this.form.controls[field].invalid)) {
      return;
    }

    this.addingOffer = true;
    this.currentStep = 2;
  }

  previousStep(): void {
    if (this.loading) {
      return;
    }

    this.currentStep = 1;
    this.errorMessage = '';
  }

  close(): void {
    if (this.loading) {
      return;
    }

    this.closed.emit();
  }

  submit(): void {
    if (this.loading) {
      return;
    }

    this.errorMessage = '';
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.currentStep = 1;
      return;
    }

    const value = this.form.getRawValue();
    const companyId = Number(value.companyId);
    const methodId = value.applicationMethodId
      ? Number(value.applicationMethodId)
      : null;

    if (!Number.isInteger(companyId) || companyId <= 0) {
      this.errorMessage = 'Sélectionne une entreprise valide.';
      this.currentStep = 1;
      return;
    }

    if (
      methodId !== null &&
      (!Number.isInteger(methodId) || methodId <= 0)
    ) {
      this.errorMessage = 'Sélectionne une méthode de candidature valide.';
      this.currentStep = 1;
      return;
    }

    const payload: CreateApplicationPayload = {
      label: value.label!.trim(),
      applyDate: value.applyDate!,
      companyId,
      applicationMethodId: methodId,
      description: value.description?.trim() || null,
    };

    if (this.currentStep === 2 && this.addingOffer) {
      this.offerForm.markAllAsTouched();

      if (this.offerForm.invalid) {
        return;
      }

      const offerValue = this.offerForm.getRawValue();
      const publicationDate = offerValue.publicationDate!;
      const expirationDate = offerValue.expirationDate || null;
      const url = offerValue.url?.trim() || null;

      if (
        expirationDate &&
        expirationDate < publicationDate
      ) {
        this.errorMessage =
          'La date d’expiration doit être postérieure ou égale à la date de publication.';
        return;
      }

      payload.offer = {
        jobTitle: offerValue.jobTitle!.trim(),
        contractType: offerValue.contractType?.trim() || null,
        description: offerValue.description!.trim(),
        publicationDate,
        expirationDate,
        url,
      };
    }

    this.loading = true;

    this.applicationService.create(payload).subscribe({
      next: (created) => {
        this.loading = false;
        this.created.emit(created);
        this.closed.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(error);
      },
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    const body = error.error;

    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (body && typeof body === 'object') {
      if (typeof body.error === 'string' && body.error.trim()) {
        return body.error;
      }

      if (typeof body.detail === 'string' && body.detail.trim()) {
        return body.detail;
      }

      if (typeof body['hydra:description'] === 'string') {
        return body['hydra:description'];
      }

      if (typeof body.title === 'string' && error.status >= 500) {
        return 'Une erreur serveur est survenue. Réessaie plus tard.';
      }
    }

    if (error.status === 401 || error.status === 403) {
      return 'Tu dois être connecté pour enregistrer cette candidature.';
    }

    if (error.status === 404) {
      return "Le point d'accès demandé est introuvable.";
    }

    if (error.status === 422) {
      return 'Les données sont invalides. Vérifie la date et les champs obligatoires.';
    }

    return "L'enregistrement a échoué. Réessaie.";
  }
}
