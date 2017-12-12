import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router'
import { CreateTradeComponent } from "../create-trade/create-trade.component"
import { DepositCurrencyComponent } from "../deposit-currency/deposit-currency.component"
import { WithdrawCurrencyComponent } from "../withdraw-currency/withdraw-currency.component"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) { }

  @ViewChild('chart') chartElement;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  openBuyForm(): void {
    this.openTradeForm("buy")
  }

  openSellForm(): void {
    this.openTradeForm("sell")
  }

  openTradeForm(tradeMode:string) {
    let dialogRef = this.dialog.open(CreateTradeComponent, {
      width: '350px',
      data: { currency: this.chartElement.selectedCurrency, mode: tradeMode }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openDepositForm() {
    let dialogRef = this.dialog.open(DepositCurrencyComponent, {
      width: '300px',
      data: { currency: this.chartElement.selectedCurrency }
    });
  }

  openWithdrawForm() {
    let dialogRef = this.dialog.open(WithdrawCurrencyComponent, {
      width: '300px',
      data: { currency: this.chartElement.selectedCurrency }
    });
  }
}
