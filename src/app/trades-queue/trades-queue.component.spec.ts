import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesQueueComponent } from './trades-queue.component';

describe('TradesQueueComponent', () => {
  let component: TradesQueueComponent;
  let fixture: ComponentFixture<TradesQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradesQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradesQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
