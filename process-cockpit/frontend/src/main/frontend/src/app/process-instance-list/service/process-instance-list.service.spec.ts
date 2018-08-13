import { TestBed, inject } from '@angular/core/testing';

import { ProcessInstanceListService } from './process-instance-list.service';

describe('ProcessInstanceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessInstanceListService]
    });
  });

  it('should be created', inject([ProcessInstanceListService], (service: ProcessInstanceListService) => {
    expect(service).toBeTruthy();
  }));
});
