import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { PaymentMethod } from './payment-method.service'
import { UserProfile } from './user-profile.service';
import { Trade, TradeType, Currency } from './trade.service'
import { AuthService } from '../auth.service';
import { HeadersProvider } from './headers-provider';
import { RateTicket } from './rate.service'
import { Constants } from '../constants'

@Injectable()
export class ActiveTradeService {
  private endpoint: string = `${Constants.HostName}/active_trade`;
  private cryptoExchangeEndpoint: string = `${Constants.HostName}/exchange_cryptocurrency`
  
  constructor(private http: Http, private headersProvider: HeadersProvider) {
  }

  exchangeCryptoCurrency(userTrade: Trade, offer:Trade): Observable<boolean> {
    return this.http.post(this.cryptoExchangeEndpoint, {user_trade: userTrade.id, offer_trade: offer.id}, this.headersProvider.getHeaders())
    .map(r => true)
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }


  acceptTrade(userTrade: Trade, trade: Trade): Observable<boolean> {
    let buyerTrade = userTrade;
    let sellerTrade = trade;
    if (userTrade.type == TradeType.Sell) {
      buyerTrade = trade;
      sellerTrade = userTrade;
    }
    return this.http.post(`${this.endpoint}.json`, {buyer_trade: buyerTrade.id, seller_trade: sellerTrade.id}, this.headersProvider.getHeaders())
    .map(result => true)
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  listActiveTrades(): Observable<ActiveTrade[]> {
    return this.http.get(`${this.endpoint}.json`, this.headersProvider.getHeaders())
    .map(this.mapTrades)
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  updateTradeStatus(tradeId: number, status: ActiveTradeStatus): Observable<boolean> {
    return this.http.put(`${this.endpoint}/${tradeId}.json`, {status: status}, this.headersProvider.getHeaders())
    .map(r => true)
  }

  mapTrades(response: Response): ActiveTrade[] {
    return response.json().map(r => new ActiveTrade(r));
  }
}

export class ActiveTrade {
  constructor(r: any) {
    this.id = r.id;
    this.seller = new UserProfile(r.seller);
    this.buyer = new UserProfile(r.buyer);
    this.cryptoCurrency = r.crypto_currency;
    this.cryptoCurrencyAmount = r.crypto_currency_amount;
    this.nationalCurrency = r.national_currency;
    this.nationalCurrencyAmount = r.national_currency_amount;
    this.paymentMethod = r.payment_method;
    this.status = r.status;
    this.rateTicket = new RateTicket(r.rate_ticket);
  }

  id: number;
  seller: UserProfile;
  buyer: UserProfile;
  cryptoCurrency: Currency;
  cryptoCurrencyAmount: number;
  nationalCurrency: Currency;
  nationalCurrencyAmount: number;
  paymentMethod: PaymentMethod;
  status: ActiveTradeStatus;
  rateTicket: RateTicket;
}

export enum ActiveTradeStatus {
  MoneyTransitionNotStarted = 1,
  MoneyTransitionStarted = 2,
  MoneyTransitionFinished = 3,
  MoneyTransitionApproved = 4,
  TradeCompleted = 5
}
