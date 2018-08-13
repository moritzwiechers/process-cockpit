import { TestBed, inject } from '@angular/core/testing';

import { ProcessDetailService } from './process-detail.service';

describe('ProcessDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessDetailService]
    });
  });

  it('should be created', inject([ProcessDetailService], (service: ProcessDetailService) => {
    expect(service).toBeTruthy();
  }));
});
