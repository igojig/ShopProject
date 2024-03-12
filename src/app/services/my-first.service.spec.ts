import { TestBed } from '@angular/core/testing';

import { FestivalRestService } from './festival-rest.service';

describe('MyFirstService', () => {
  let service: FestivalRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivalRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
