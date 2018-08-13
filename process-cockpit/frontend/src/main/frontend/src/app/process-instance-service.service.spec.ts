import { TestBed, inject } from '@angular/core/testing';

import { ProcessInstanceServiceService } from './process-instance-service.service';

describe('ProcessInstanceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessInstanceServiceService]
    });
  });

  it('should be created', inject([ProcessInstanceServiceService], (service: ProcessInstanceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
