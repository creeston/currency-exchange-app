import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {
  index: number = 0;


  @ViewChild('activeTrades') activeTradesComponent;
  @ViewChild('completedTrades') completedTradesComponent;
  
  constructor() { }
  

  ngOnInit() {
  }

  switchToActiveTrade() {
    this.activeTradesComponent.loadTrades();
    this.index = 1;
  }

  switchToCompletedTrades() {
    this.completedTradesComponent.loadTrades();
    this.index = 2;
  }
}
