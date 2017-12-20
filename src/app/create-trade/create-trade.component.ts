import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { TradeService, Trade, TradeType, Currency } from '../services/trade.service';
import { PaymentMethod } from '../services/payment-method.service';
import { UserProfileService } from '../services/user-profile.service';
import { BalanceService } from '../services/balance.service';


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

  paymentMethodsAll: any[] = [
    {value: PaymentMethod.PayPal, viewValue: "PayPal"},
    {value: PaymentMethod.QIWI, viewValue: "QIWI"},
    {value: PaymentMethod.YandexMoney, viewValue: "Yandex.Money"},
  ]

  paymentMethods: any[];

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
    private userService: UserProfileService,
    private balanceService: BalanceService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateTradeComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any,
    fb: FormBuilder) {
      if (data === undefined || data === null) {
        return;
      }
      this.trade.firstCurrency = data.currency;
      this.trade.type = data.tradeType;
      let userPaymentMethods = this.userService.currentUser.paymentRequisites.map(r => r.method);
      this.paymentMethods = this.paymentMethodsAll.filter(m => userPaymentMethods.includes(m.value));
    }
    
    createTrade(tradeForm: NgForm): void {
      this.errorMessage = "";
      if (tradeForm.invalid 
        || this.first_currency_amount.invalid 
        || this.second_currency_amount.invalid){
        return;
      }
      if (this.trade.type == TradeType.Buy) {
        if (this.trade.secondCurrencyAmount > this.balanceService.balance[this.trade.secondCurrency]) {
          this.snackBar.open("Not enough balance", "close", {duration: 2000});
          return;
        }
      } else {
        if (this.trade.firstCurrencyAmount > this.balanceService.balance[this.trade.firstCurrency]) {
          this.snackBar.open("Not enough balance", "close", {duration: 2000});
          return;
        }
      }

      if (this.trade.firstMinimalOffer > this.trade.firstCurrencyAmount || this.trade.secondMinimalOffer > this.trade.secondCurrencyAmount) {
        this.snackBar.open("Minimal amount should not exceed the currency amount", "close", {duration: 2000});
        return;
      }

      this.submitButtonPressed = true;
      if (!this.trade.paymentMethods) {
        this.trade.paymentMethods = [];
      }
      this.service.createTrade(this.trade)
      .subscribe(
        result => {
          this.balanceService.getBalance()
          .subscribe(r => this.dialogRef.close({redirect: true}));
        },
        error => {
          let key = Object.keys(error)[0]
          this.snackBar.open(`${key}: ${error[key]}`, "close", {duration: 2000})
          this.submitButtonPressed = false;
        })
    }

  ngOnInit() {

  }
}