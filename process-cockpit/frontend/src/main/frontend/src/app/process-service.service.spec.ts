import { TestBed, inject } from '@angular/core/testing';

import { ProcessServiceService } from './process-service.service';

describe('ProcessServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessServiceService]
    });
  });

  it('should be created', inject([ProcessServiceService], (service: ProcessServiceService) => {
    expect(service).toBeTruthy();
  }));
});
