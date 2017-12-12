import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-create-trade',
  templateUrl: './create-trade.component.html',
  styleUrls: ['./create-trade.component.css']
})
export class CreateTradeComponent implements OnInit {
  trade: Trade = new Trade();
  crypto_currencies: any[] = [
    {value: 1, viewValue: "ETH"},
    {value: 2, viewValue: "BTC"},
    {value: 3, viewValue: "LTC"},
  ]

  currencies: any[] = [
    {value: 4, viewValue: "USD"},
    {value: 5, viewValue: "RUB"},
    {value: 6, viewValue: "BYR"},
    {value: 1, viewValue: "ETH"},
    {value: 2, viewValue: "BTC"},
    {value: 3, viewValue: "LTC"},
  ]

  paymentMethods: any[] = [
    {value: 1, viewValue: "PayPal"},
    {value: 2, viewValue: "QIWI"},
    {value: 3, viewValue: "Yandex.Money"},
  ]

  first_currency_amount: FormControl = new FormControl('', [this.greaterThanZeroValidator]);
  second_currency_amount: FormControl = new FormControl('', [this.greaterThanZeroValidator]);

  errorMessage: string;

  greaterThanZeroValidator(c: FormControl) {
    if (c.value <= 0) {
      return {validate: {valid:false}}
    }
    return null;
  }

  constructor(
    public dialogRef: MatDialogRef<CreateTradeComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any,
    fb: FormBuilder) {
      if (data.currency == "ETH"){
        this.trade.first_currency = 1;
      } else if (data.currency == "LTC"){
        this.trade.first_currency = 3;
      } else if (data.currency == "BTC"){
        this.trade.first_currency = 2;
      }

      if (data.mode == "buy"){
        this.trade.mode = 1;
      } else {
        this.trade.mode = 2;
      }
    }
    
    createTrade(tradeForm: NgForm): void {
      if (tradeForm.invalid 
        || this.first_currency_amount.invalid 
        || this.second_currency_amount.invalid
        || this.trade.first_currency_amount < this.trade.minimal_offer) {
        return;
      }
      this.dialogRef.close({redirect: true});
    }

  ngOnInit() {

  }
}

export class Trade {
  mode: number = 1;
  first_currency: number = 1;
  first_currency_amount: number = 0;
  minimal_offer: number = 0;
  second_currency: number = 1;
  second_currency_amount: number = 0;
  payment_methods: number[]
}