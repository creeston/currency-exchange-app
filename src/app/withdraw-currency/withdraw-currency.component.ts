import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Currency } from '../services/trade.service';
import { EnumHelper } from '../enum-helper';

@Component({
  selector: 'app-withdraw-currency',
  templateUrl: './withdraw-currency.component.html',
  styleUrls: ['./withdraw-currency.component.css']
})
export class WithdrawCurrencyComponent implements OnInit {
  currency: Currency;
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
    this.dialogRef.close(true);
  }

  stringCurrency(currency: Currency) {
    return EnumHelper.currencyToString(currency);
  }

}
