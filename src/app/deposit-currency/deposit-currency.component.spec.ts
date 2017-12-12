import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCurrencyComponent } from './deposit-currency.component';

describe('DepositCurrencyComponent', () => {
  let component: DepositCurrencyComponent;
  let fixture: ComponentFixture<DepositCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
