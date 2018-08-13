import { TestBed, inject } from '@angular/core/testing';

import { ProcessViewerService } from './process-viewer.service';

describe('ProcessViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessViewerService]
    });
  });

  it('should be created', inject([ProcessViewerService], (service: ProcessViewerService) => {
    expect(service).toBeTruthy();
  }));
});
