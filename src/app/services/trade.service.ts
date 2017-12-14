import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { PaymentMethod } from './payment-method.service'

@Injectable()
export class TradeService {
  public token: string;
  private endpoint: string = 'https://still-escarpment-16037.herokuapp.com/trade.json';
  private headers: Headers;
  
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.headers = new Headers(
      {'Content-Type': 'application/json', 'Authorization': `Token ${this.token}`});
  }
  
  listUserTrades(): Observable<Trade[]> {
    return this.http.get(this.endpoint, {headers: this.headers})
    .map(this.mapTrades)
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  createTrade(trade: Trade): Observable<boolean> {
    console.log(JSON.stringify(new JTrade(trade)));
    return this.http.post(this.endpoint, JSON.stringify(new JTrade(trade)), {headers: this.headers})
    .map(result => {
      return true;
    })
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  mapTrades(response: Response): Trade[] {
    return response.json().map(r => new Trade(r));
  }
}

class JTrade {
  constructor(trade: Trade) {
    this.id = trade.id;
    this.first_currency = trade.firstCurrency;
    this.first_currency_amount = trade.firstCurrencyAmount;
    this.second_currency = trade.secondCurrency;
    this.second_currency_amount = trade.secondCurrencyAmount;
    this.minimal_offer = trade.minimalOffer;
    this.trade_type = trade.type;
    this.payment_methods = trade.paymentMethods;
  }

  id: number;
  first_currency: number;
  first_currency_amount: number;
  minimal_offer: number;
  second_currency: number;
  second_currency_amount: number;
  trade_type: number;
  payment_methods: number[]; 
}

export class Trade {
  constructor(r: any) {
    if (r === null) {
      return;
    }
    this.id = r.id;
    this.firstCurrency = r.first_currency.code;
    this.firstCurrencyAmount = r.first_currency_amount;
    this.secondCurrency = r.second_currency.code;
    this.secondCurrencyAmount = r.second_currency_amount;
    this.minimalOffer = r.minimal_offer;
    this.type = r.trade_type.id;
    this.paymentMethods = r.paymentMethods;
  }

  id: number;
  firstCurrency: Currency;
  firstCurrencyAmount: number;
  minimalOffer: number;
  secondCurrency: Currency;
  secondCurrencyAmount: number;
  type: TradeType;
  paymentMethods: PaymentMethod[];
}

export enum TradeType {
  Buy = 1,
  Sell = 2
}

export enum Currency {
  BYR = 1,
  RUB = 2,
  USD = 3,
  BTC = 4,
  LTC = 5,
  ETH = 6
}