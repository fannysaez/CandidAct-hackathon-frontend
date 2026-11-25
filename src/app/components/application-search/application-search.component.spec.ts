import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSearchComponent } from './application-search.component';

describe('ApplicationSearchComponent', () => {
  let component: ApplicationSearchComponent;
  let fixture: ComponentFixture<ApplicationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
