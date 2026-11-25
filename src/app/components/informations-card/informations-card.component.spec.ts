import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsCardComponent } from './informations-card.component';

describe('InformationsCardComponent', () => {
  let component: InformationsCardComponent;
  let fixture: ComponentFixture<InformationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
