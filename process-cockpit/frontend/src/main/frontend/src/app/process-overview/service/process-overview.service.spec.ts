import { TestBed, inject } from '@angular/core/testing';

import { ProcessOverviewService } from './process-overview.service';

describe('ProcessOverviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessOverviewService]
    });
  });

  it('should be created', inject([ProcessOverviewService], (service: ProcessOverviewService) => {
    expect(service).toBeTruthy();
  }));
});
