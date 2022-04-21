import { TestBed } from '@angular/core/testing';

import { LightsApiService } from './lights-api.service';

describe('LightsApiService', () => {
  let service: LightsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
