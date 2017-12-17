import { TestBed, inject } from '@angular/core/testing';

import { ActiveTradeService } from './active-trade.service';

describe('ActiveTradeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveTradeService]
    });
  });

  it('should be created', inject([ActiveTradeService], (service: ActiveTradeService) => {
    expect(service).toBeTruthy();
  }));
});
