import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-withdraw-currency',
  templateUrl: './withdraw-currency.component.html',
  styleUrls: ['./withdraw-currency.component.css']
})
export class WithdrawCurrencyComponent implements OnInit {
  currency: string;
  amount: number;
  address: string;

  constructor(
    public dialogRef: MatDialogRef<WithdrawCurrencyComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.currency = data.currency;
    }

  ngOnInit() {
  }

  withdraw() {
    this.dialogRef.close({redirect: true});
  }

}
