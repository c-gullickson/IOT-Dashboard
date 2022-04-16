import { TestBed } from '@angular/core/testing';

import { RingApiService } from './ring-api.service';

describe('RingApiService', () => {
  let service: RingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
