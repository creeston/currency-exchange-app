import { Component, OnInit, Host } from '@angular/core';
import { TradeService, Trade, TradeType, Currency } from '../services/trade.service'
import { MatDialog } from '@angular/material';
import { CreateTradeComponent } from '../create-trade/create-trade.component';
import { TradesComponent } from '../trades/trades.component';
import { TradeOffersComponent } from '../trade-offers/trade-offers.component';
import { ActiveTradeService } from '../services/active-trade.service';
import { BalanceService } from '../services/balance.service';
import { EnumHelper } from '../enum-helper';

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
    private balanceService: BalanceService,
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
    message += `${trade.firstCurrencyAmount}(${trade.firstMinimalOffer}) ${EnumHelper.currencyToString(trade.firstCurrency)} for ${trade.secondCurrencyAmount} ${EnumHelper.currencyToString(trade.secondCurrency)}`
    return message;
  }

  deleteTrade(trade: Trade) {
    this.tradeService.deleteTrade(trade).subscribe(success => {
      this.balanceService.getBalance().subscribe(r => this.loadTrades());
    })
  }

  loadTrades() {
    this.tradeService.listUserTrades().subscribe(result => {
      this.trades = result;
      this.tradesLoaded = true;
    });
  }
  
    getImageUrl(currencyType) {
      if (currencyType == Currency.BTC) {
        return "assets/currencies/btc_icon.jpg";
      } else if (currencyType == Currency.LTC) {
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
        width: '460px',
        height: '600px',
        data: trade
      })
      .afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        if (result.redirect) {
          this.parentComponent.switchToActiveTrade();
        } else if (result.redirectToCompleted) {
          this.loadTrades();
        }
      });
    }
}
