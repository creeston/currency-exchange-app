import { TestBed, inject } from '@angular/core/testing';

import { ContactInformationService } from './contact-information.service';

describe('ContactInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactInformationService]
    });
  });

  it('should be created', inject([ContactInformationService], (service: ContactInformationService) => {
    expect(service).toBeTruthy();
  }));
});
