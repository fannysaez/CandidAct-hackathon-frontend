import { TestBed } from '@angular/core/testing';

import { ApplicationSearchService } from './application-search.service';

describe('ApplicationSearchService', () => {
  let service: ApplicationSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
