import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-deposit-currency',
  templateUrl: './deposit-currency.component.html',
  styleUrls: ['./deposit-currency.component.css']
})
export class DepositCurrencyComponent implements OnInit {
  address: string;

  constructor(
    public dialogRef: MatDialogRef<DepositCurrencyComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.address = data.address;
    }

  ngOnInit() {
  }

}
