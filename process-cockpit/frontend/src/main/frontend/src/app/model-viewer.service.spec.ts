import { TestBed, inject } from '@angular/core/testing';

import { ModelViewerService } from './model-viewer.service';

describe('ModelViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelViewerService]
    });
  });

  it('should be created', inject([ModelViewerService], (service: ModelViewerService) => {
    expect(service).toBeTruthy();
  }));
});
