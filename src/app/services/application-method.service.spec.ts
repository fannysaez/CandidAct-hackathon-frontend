import { TestBed } from '@angular/core/testing';

import { ApplicationMethodService } from './application-method.service';

describe('ApplicationMethodService', () => {
  let service: ApplicationMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
