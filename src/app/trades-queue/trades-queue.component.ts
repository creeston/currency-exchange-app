import { Component, OnInit, Host } from '@angular/core';
import { TradeService, Trade, TradeType } from '../services/trade.service'
import { MatDialog } from '@angular/material';
import { CreateTradeComponent } from '../create-trade/create-trade.component';
import { TradesComponent } from '../trades/trades.component';
import { TradeOffersComponent } from '../trade-offers/trade-offers.component';
import { ActiveTradeService } from '../services/active-trade.service';

@Component({
  selector: 'app-trades-queue',
  templateUrl: './trades-queue.component.html',
  styleUrls: ['./trades-queue.component.css']
})
export class TradesQueueComponent implements OnInit {
  trades: Trade[];
  tradesLoaded: boolean = false;
  parentComponent: TradesComponent;

  constructor(
    @Host() parent: TradesComponent,
    public dialog: MatDialog, 
    private tradeService: TradeService) {
      
     this.parentComponent = parent; 
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
    message += `${trade.firstCurrencyAmount}(${trade.firstMinimalOffer}) ${trade.firstCurrency} for ${trade.secondCurrencyAmount} ${trade.secondCurrency}`
    return message;
  }

  deleteTrade(trade: Trade) {
    this.tradeService.deleteTrade(trade).subscribe(success => {
      this.loadTrades();
    })
  }

  loadTrades() {
    this.tradeService.listUserTrades().subscribe(result => {
      this.trades = result;
      this.tradesLoaded = true;
    });
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

    openOffersView(trade: Trade) {
      let dialogRef = this.dialog.open(TradeOffersComponent, {
        width: '500px',
        data: trade
      })
      .afterClosed().subscribe(result => {
        if (result.redirect) {
          this.parentComponent.index = 1;
        }
      });
    }
}
