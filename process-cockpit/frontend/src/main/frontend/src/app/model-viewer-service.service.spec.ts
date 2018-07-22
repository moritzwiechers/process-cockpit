import { TestBed, inject } from '@angular/core/testing';

import { ModelViewerServiceService } from './model-viewer-service.service';

describe('ModelViewerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelViewerServiceService]
    });
  });

  it('should be created', inject([ModelViewerServiceService], (service: ModelViewerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
