import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTradesComponent } from './completed-trades.component';

describe('CompletedTradesComponent', () => {
  let component: CompletedTradesComponent;
  let fixture: ComponentFixture<CompletedTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
