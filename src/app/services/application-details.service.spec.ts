import { TestBed } from '@angular/core/testing';

import { ApplicationDetailsService } from './application-details.service';

describe('ApplicationDetailsService', () => {
  let service: ApplicationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
