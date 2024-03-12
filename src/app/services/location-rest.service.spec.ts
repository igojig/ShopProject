import { TestBed } from '@angular/core/testing';

import { LocationRestService } from './location-rest.service';

describe('LocationRestService', () => {
  let service: LocationRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
