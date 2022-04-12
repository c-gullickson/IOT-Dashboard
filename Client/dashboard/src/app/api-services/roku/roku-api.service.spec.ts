import { TestBed } from '@angular/core/testing';

import { RokuApiService } from './roku-api.service';

describe('RokuApiService', () => {
  let service: RokuApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RokuApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
