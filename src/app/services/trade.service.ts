import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { PaymentMethod } from './payment-method.service'
import { UserProfile } from './user-profile.service';
import { AuthService } from '../auth.service';
import { HeadersProvider } from './headers-provider';

@Injectable()
export class TradeService {
  private endpoint: string = 'https://still-escarpment-16037.herokuapp.com/trade.json';
  
  constructor(private http: Http, private headersProvider: HeadersProvider) {
  }
  
  listUserTrades(): Observable<Trade[]> {
    return this.http.get(this.endpoint,this.headersProvider.getHeaders())
    .map(this.mapTrades)
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  createTrade(trade: Trade): Observable<boolean> {
    return this.http.post(this.endpoint, JSON.stringify(new JTrade(trade)), this.headersProvider.getHeaders())
    .map(result => {
      return true;
    })
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteTrade(trade: Trade): Observable<boolean> {
    return this.http.delete(`https://still-escarpment-16037.herokuapp.com/trade/${trade.id}.json`, this.headersProvider.getHeaders())
    .map(result => {
      return true;
    })
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  mapTrades(response: Response): Trade[] {
    return response.json().map(r => new Trade(r));
  }

  listOffers(tradeId: number): Observable<Trade[]> {
    return this.http.get(`https://still-escarpment-16037.herokuapp.com/offers/${tradeId}`, this.headersProvider.getHeaders())
      .map(this.mapTrades)
      .catch((error:any) => {
        console.log(error);
        return Observable.throw(error.json() || 'Server error')}
      );
  }
}

class JTrade {
  constructor(trade: Trade) {
    this.id = trade.id;
    this.first_currency = trade.firstCurrency;
    this.first_currency_amount = trade.firstCurrencyAmount;
    this.second_currency = trade.secondCurrency;
    this.second_currency_amount = trade.secondCurrencyAmount;
    this.first_minimal_offer = null;
    this.second_minimal_offer = null;
    if (trade.firstMinimalOffer && trade.firstMinimalOffer > 0) {
      this.first_minimal_offer = trade.firstMinimalOffer;
    } else if(trade.secondMinimalOffer && trade.secondMinimalOffer > 0) {
      this.second_minimal_offer = trade.secondMinimalOffer;
    }
    this.trade_type = trade.type;
    this.payment_methods = trade.paymentMethods;
  }

  id: number;
  first_currency: number;
  first_currency_amount: number;
  first_minimal_offer: number;
  second_minimal_offer: number;
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
    this.firstMinimalOffer = r.first_minimal_offer;
    this.secondMinimalOffer = r.second_minimal_offer;
    this.type = r.trade_type.id;
    this.paymentMethods = r.paymentMethods;
    this.creator = new UserProfile(r.creator);
  }

  id: number;
  creator: UserProfile;
  firstCurrency: Currency;
  firstCurrencyAmount: number;
  firstMinimalOffer: number;
  secondMinimalOffer: number;
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