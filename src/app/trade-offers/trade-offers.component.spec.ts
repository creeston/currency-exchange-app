import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeOffersComponent } from './trade-offers.component';

describe('TradeOffersComponent', () => {
  let component: TradeOffersComponent;
  let fixture: ComponentFixture<TradeOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
