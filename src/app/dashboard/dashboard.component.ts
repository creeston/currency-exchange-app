import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'
import { CreateTradeComponent } from "../create-trade/create-trade.component"
import { DepositCurrencyComponent } from "../deposit-currency/deposit-currency.component"
import { WithdrawCurrencyComponent } from "../withdraw-currency/withdraw-currency.component"
import { BalanceService, UserWallet } from '../services/balance.service';
import { TradeType, Trade } from '../services/trade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userWallets: string[] = [];

  constructor(public dialog: MatDialog, private router: Router, private balanceService: BalanceService, public snackBar: MatSnackBar) { 
    if (this.balanceService.wallets) {
      for (let i = 0; i < this.balanceService.wallets.length; i++) {
        this.userWallets[this.balanceService.wallets[i].currency] = this.balanceService.wallets[i].address;
      };
    }
    this.balanceService.getUserWallets()
    .subscribe(wallets => {
      for (let i = 0; i < wallets.length; i++) {
        this.userWallets[wallets[i].currency] = wallets[i].address;
      }
    })
  }

  @ViewChild('chart') chartElement;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  openBuyForm(): void {
    this.openTradeForm(TradeType.Buy);
  }

  openSellForm(): void {
    this.openTradeForm(TradeType.Sell);
  }

  openTradeForm(type: TradeType) {
    let dialogRef = this.dialog.open(CreateTradeComponent, {
      width: '350px',
      data: { currency: +this.chartElement.selectedCurrency, tradeType: type }
    })
    .afterClosed().subscribe(result => {
      if (result.redirect) {
        this.router.navigate(['home', 'trades'])
      }
      console.log(result);
    });
  }

  openDepositForm() {
    let dialogRef = this.dialog.open(DepositCurrencyComponent, {
      width: '400px',
      data: { address: this.userWallets[+this.chartElement.selectedCurrency] }
    });
  }

  openWithdrawForm() {
    let dialogRef = this.dialog.open(WithdrawCurrencyComponent, {
      width: '300px',
      data: { currency: +this.chartElement.selectedCurrency }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open("Your currency will be sent in 24h", "close", {duration: 3000});
      }
    })
  }
}
