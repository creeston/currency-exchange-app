import { Component, OnInit } from '@angular/core';
import { TradeService, Trade, TradeType } from '../services/trade.service'
import { MatDialog } from '@angular/material';
import { CreateTradeComponent } from '../create-trade/create-trade.component';

@Component({
  selector: 'app-trades-queue',
  templateUrl: './trades-queue.component.html',
  styleUrls: ['./trades-queue.component.css']
})
export class TradesQueueComponent implements OnInit {
  trades: Trade[];

  constructor(public dialog: MatDialog, private tradeService: TradeService) { 
    this.loadTrades();
  }

  ngOnInit() {
  }

  createTradeDescription(trade: Trade): string {
    let message = "";
    if (trade.type == TradeType.Buy) {
      message = "Buying ";
    } else {
      message = "Selling ";
    }
    message += `${trade.firstCurrencyAmount}(${trade.minimalOffer}) ${trade.firstCurrency} for ${trade.secondCurrencyAmount} ${trade.secondCurrency}`
    return message;
  }

  loadTrades() {
    this.tradeService.listUserTrades().subscribe(result => {
      this.trades = result;
    });
  }

  getImageClass(currencyType) {
    if (currencyType == "BTC") {
      return "btc-header-image";
    } else if (currencyType == "LTC") {
      return "ltc-header-image";
    } else {
      return "eth-header-image";
    }
  }

    getImageUrl(currencyType) {
      if (currencyType == "BTC") {
        return "assets/currencies/btc_icon.jpg";
      } else if (currencyType == "LTC") {
        return "assets/currencies/ltc_icon.ico";
      } else {
        return "assets/currencies/eth_icon.png";
      }
    }

    openTradeDialog() {
      let dialogRef = this.dialog.open(CreateTradeComponent, {
        width: '350px'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.loadTrades();
      });
    }
}
