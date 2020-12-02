import { TestBed } from '@angular/core/testing';

import { PodcasterService } from './podcaster.service';

describe('PodcasterService', () => {
  let service: PodcasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodcasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
