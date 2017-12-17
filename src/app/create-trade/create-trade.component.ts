import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { TradeService, Trade, TradeType, Currency } from '../services/trade.service';
import { PaymentMethod } from '../services/payment-method.service';


@Component({
  selector: 'app-create-trade',
  templateUrl: './create-trade.component.html',
  styleUrls: ['./create-trade.component.css']
})
export class CreateTradeComponent implements OnInit {
  trade: Trade = new Trade(null);
  crypto_currencies: any[] = [
    {value: Currency.ETH, viewValue: "ETH"},
    {value: Currency.BTC, viewValue: "BTC"},
    {value: Currency.LTC, viewValue: "LTC"},
  ]

  currencies: any[] = [
    {value: Currency.USD, viewValue: "USD"},
    {value: Currency.RUB, viewValue: "RUB"},
    {value: Currency.BYR, viewValue: "BYR"},
    {value: Currency.ETH, viewValue: "ETH"},
    {value: Currency.BTC, viewValue: "BTC"},
    {value: Currency.LTC, viewValue: "LTC"},
  ]

  paymentMethods: any[] = [
    {value: PaymentMethod.PayPal, viewValue: "PayPal"},
    {value: PaymentMethod.QIWI, viewValue: "QIWI"},
    {value: PaymentMethod.YandexMoney, viewValue: "Yandex.Money"},
  ]

  first_currency_amount: FormControl = new FormControl('', [this.greaterThanZeroValidator]);
  second_currency_amount: FormControl = new FormControl('', [this.greaterThanZeroValidator]);

  errorMessage: string;
  isPaymentMethodFieldHidden: boolean = true;

  submitButtonPressed: boolean = false;

  secondCurrencyChanged() {
    if (this.trade.secondCurrency === Currency.BYR || this.trade.secondCurrency === Currency.RUB || this.trade.secondCurrency === Currency.USD){
      this.isPaymentMethodFieldHidden = false;
    } else {
      this.isPaymentMethodFieldHidden = true;
    }
  }

  greaterThanZeroValidator(c: FormControl) {
    if (c.value <= 0) {
      return {validate: {valid:false}}
    }
    return null;
  }

  constructor(
    private service: TradeService,
    public dialogRef: MatDialogRef<CreateTradeComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any,
    fb: FormBuilder) {
      if (data === undefined || data === null) {
        return;
      }
      this.trade.firstCurrency = data.currency;
      this.trade.type = data.tradeType;
    }
    
    createTrade(tradeForm: NgForm): void {
      this.errorMessage = "";
      if (tradeForm.invalid 
        || this.first_currency_amount.invalid 
        || this.second_currency_amount.invalid) {
        return;
      }
      this.submitButtonPressed = true;
      this.service.createTrade(this.trade)
      .subscribe(
        result => {
          this.dialogRef.close({redirect: true});
        },
        error => {
          this.errorMessage = JSON.stringify(error);
          this.submitButtonPressed = false;
        })
    }

  ngOnInit() {

  }
}