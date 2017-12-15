import { Component, OnInit } from '@angular/core';
import { CurrencyDataService } from './currency-data.service'
import { BalanceService } from '../services/balance.service';
import { Currency } from '../services/trade.service';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {
  single: any[];
  multi: any[];
  selectedCurrency: string = "BTC";
  view: any[] = [700, 400];
  private balance: any;
  currencyBalance: number;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#4189C7', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  
  constructor(private dataService: CurrencyDataService, private balanceService: BalanceService) {
    this.multi = dataService.multi; 
    balanceService.getBalance().subscribe(
      balance => {
        this.balance = {};
        for (let i = 0; i < balance.length; i++) {
          this.balance[this.currencyToString(balance[i].currency)] = balance[i].balance;
        }
        this.currencyBalance = this.balance[this.selectedCurrency];
      },
      error => {
        console.log(error);
      }
    )
  }

  currencyToString(currency: Currency) {
    if (currency == Currency.BTC) {
      return "BTC";
    } else if (currency == Currency.ETH) {
      return "ETH";
    } else {
      return "LTC";
    }
  }

  currencyChanged() {
    this.currencyBalance = this.balance[this.selectedCurrency];
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {

  }

}
