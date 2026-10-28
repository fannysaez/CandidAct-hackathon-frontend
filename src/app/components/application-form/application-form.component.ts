
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { StepperComponent } from '../stepper/stepper.component';
import { OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ApplicationMethodService } from '../../services/application-method.service';
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

  companies: Company[] = [];
  applicationMethods: ApplicationMethod[] = [];

  loadingCompanies = false;
  loadingMethods = false;

  private readonly companyService = inject(CompanyService);
  private readonly methodService = inject(ApplicationMethodService);

  //Cherche l'entreprise et la méthode de candidature
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

  //Ajouter la ville suite à l'entreprise
  onCompanyChange(): void {
    const companyId = Number(this.form.controls.companyId.value);

    const company = this.companies.find(
      (item) => item.id === companyId
    );

    this.form.controls.city.setValue(company?.city ?? '');
  }

  //FormBuilder
  private readonly fb = inject(FormBuilder);

  @Output() closed = new EventEmitter<void>();

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
  });

  get modalTitle(): string {
    return this.addingOffer
      ? 'Ajouter une candidature et une offre'
      : 'Ajouter une candidature';
  }

  nextStep(): void {
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

    if (this.currentStep === 2 && this.addingOffer) {
      this.offerForm.markAllAsTouched();

      if (this.offerForm.invalid) {
        return;
      }

      // La création liée sera branchée après adaptation du backend.
      console.log('Candidature :', this.form.getRawValue());
      console.log('Offre :', this.offerForm.getRawValue());
      return;
    }

    // La création HTTP de la candidature seule sera branchée ensuite.
    console.log('Candidature :', this.form.getRawValue());
  }
}
