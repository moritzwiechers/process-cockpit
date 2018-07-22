import { TestBed, inject } from '@angular/core/testing';

import { SettingsServiceService } from './settings-service.service';

describe('SettingsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsServiceService]
    });
  });

  it('should be created', inject([SettingsServiceService], (service: SettingsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
