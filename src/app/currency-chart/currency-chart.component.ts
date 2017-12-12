import { Component, OnInit } from '@angular/core';
import { CurrencyDataService } from './currency-data.service'

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

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Market price $';

  colorScheme = {
    domain: ['#4189C7', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  
  constructor(private dataService: CurrencyDataService) {
    this.multi = dataService.multi; 
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {

  }

}
