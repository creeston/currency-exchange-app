import { Component, OnInit } from '@angular/core';
import { CurrencyDataService, CurrencyRate } from '../services/currency-data.service'
import { BalanceService } from '../services/balance.service';
import { Currency } from '../services/trade.service';
import { EnumHelper } from '../enum-helper'

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {
  selectedCurrency: string = "4";
  selectedCurrencyString: string = "BTC";
  view: any[] = [700, 400];
  private balance: any;
  currencyBalance: number;
  isBalanceLoaded: boolean = false;

  colorScheme = {
    domain: ['#4189C7', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  autoScale = true;

  currencyCharts = [[],[],[]]

  createCurrencyCharts(rates: CurrencyRate[]) {
    this.currencyCharts[0][0] = {
      "name": "BTC",
      "series": rates.filter(r => r.currency == Currency.BTC).map(r => new ChartElement(r))
    };
    this.currencyCharts[1][0] = {
      "name": "LTC",
      "series": rates.filter(r => r.currency == Currency.LTC).map(r => new ChartElement(r))
    };
    this.currencyCharts[2][0] = {
      "name": "ETH",
      "series": rates.filter(r => r.currency == Currency.ETH).map(r => new ChartElement(r))
    };
  }
  
  constructor(private dataService: CurrencyDataService, private balanceService: BalanceService) {
    if (dataService.currencyRates) {
      this.createCurrencyCharts(dataService.currencyRates);
    } else {
      this.dataService.getCurrencyRates()
      .subscribe(rates => {
        this.createCurrencyCharts(rates);
      })
    }
    if (balanceService.balance) {
      this.balance = balanceService.balance;
      this.currencyBalance = this.balance[+this.selectedCurrency];
      this.isBalanceLoaded = true;
    } else {
      balanceService.getBalance().subscribe(
        balance => {
          this.balance = balance;
          this.currencyBalance = this.balance[+this.selectedCurrency];
          this.isBalanceLoaded = true;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  currencyChanged() {
    this.currencyBalance = this.balance[+this.selectedCurrency];
    this.selectedCurrencyString = EnumHelper.currencyToString(+this.selectedCurrency);
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {

  }

}

class ChartElement {
  constructor(rate: CurrencyRate) {
    this.name = rate.date;
    this.value = rate.value;
  }
  name: string;
  value: number;
}
