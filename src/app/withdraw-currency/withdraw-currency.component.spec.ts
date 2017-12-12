import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCurrencyComponent } from './withdraw-currency.component';

describe('WidthdrawCurrencyComponent', () => {
  let component: WithdrawCurrencyComponent;
  let fixture: ComponentFixture<WithdrawCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
