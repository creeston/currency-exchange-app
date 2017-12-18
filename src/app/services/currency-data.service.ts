import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HeadersProvider } from './headers-provider';
import { Currency } from './trade.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrencyDataService {
  private endpoint: string = "https://still-escarpment-16037.herokuapp.com/currency_rate/";
  currencyRates: CurrencyRate[];

  constructor(private http: Http, private headersProvider: HeadersProvider) { }

  getCurrencyRates(): Observable<CurrencyRate[]> {
    return this.http.get(this.endpoint, this.headersProvider.getHeaders())
    .map(r => {
      this.currencyRates = r.json().map(j => new CurrencyRate(j));
      return this.currencyRates;
    })
  }
}

export class CurrencyRate {
  constructor(r: any) {
    this.currency = r.currency;
    this.date = r.date;
    this.value = r.value;
  }

  currency: Currency;
  date: string;
  value: number;
}
