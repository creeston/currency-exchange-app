import { Component, OnInit } from '@angular/core';
import { MatTab } from '@angular/material';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {
  index: number = 0;
  constructor() { }

  ngOnInit() {
  }
}
