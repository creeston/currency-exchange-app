import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trades-queue',
  templateUrl: './trades-queue.component.html',
  styleUrls: ['./trades-queue.component.css']
})
export class TradesQueueComponent implements OnInit {
  trades: Trade[] = [
    new Trade("buy", "BTC", 5, "BYR", 10, 5),
    new Trade("sell", "ETH", 2, "USD", 2, 1),
    new Trade("buy", "LTC", 20, "RUB", 100, 20),
  ]

  constructor() { }

  ngOnInit() {
  }

  createTradeDescription(trade: Trade): string {
    let message = "";
    if (trade.mode == "buy") {
      message = "Buy ";
    } else {
      message = "Sell ";
    }
    message += `${trade.firstCurrencyAmount}(${trade.minimalOffer}) ${trade.firstCurrency} for ${trade.secondCurrencyAmount} ${trade.secondCurrency}`
    return message;
  }
}

export class Trade {
  mode: string;
  firstCurrency: string;
  firstCurrencyAmount: number;
  secondCurrency: string;
  secondCurrencyAmount: number;
  minimalOffer: number;

  constructor(mode:string, 
    firstCurrency: string, firstCurrencyAmount: number,
    secondCurrency: string, secondCurrencyAmount: number,
    minimalOffer: number) {
      this.firstCurrency = firstCurrency;
      this.firstCurrencyAmount = firstCurrencyAmount;
      this.secondCurrency = secondCurrency;
      this.secondCurrencyAmount = secondCurrencyAmount;
      this.mode = mode;
      this.minimalOffer = minimalOffer;
  }
}
