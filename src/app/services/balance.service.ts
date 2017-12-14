import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Currency } from './trade.service'

@Injectable()
export class BalanceService {
  public token: string;
  private endpoint: string = 'https://still-escarpment-16037.herokuapp.com/balance';
  private headers: Headers;
  
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.headers = new Headers(
      {'Content-Type': 'application/json', 'Authorization': `Token ${this.token}`});
  }
  
  getBalance(): Observable<CurrencyBalance[]> {
    return this.http.get(this.endpoint, {headers: this.headers})
    .map(result => {
      let r = result.json();
      return [
        new CurrencyBalance(Currency.BTC, r.BTC),
        new CurrencyBalance(Currency.LTC, r.LTC),
        new CurrencyBalance(Currency.ETH, r.ETH)
      ]
    })
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }
}

export class CurrencyBalance {
  constructor(currency: Currency, balance: number) {
    this.currency = currency;
    this.balance = balance;
  }
  currency: Currency;
  balance: number;
}
