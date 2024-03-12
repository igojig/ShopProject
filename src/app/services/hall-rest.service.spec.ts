import { TestBed } from '@angular/core/testing';

import { HallRestService } from './hall-rest.service';

describe('HallRestService', () => {
  let service: HallRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
