import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Currency } from './trade.service'
import { AuthService } from '../auth.service';
import { HeadersProvider } from './headers-provider';
import { Constants } from '../constants'


@Injectable()
export class BalanceService {
  private endpoint: string = `${Constants.HostName}/balance`;
  private walletEndpoint: string = `${Constants.HostName}/current_user_wallet`;

  balance: number[];
  wallets: UserWallet[];
  
  constructor(private http: Http, private headersProvider: HeadersProvider) {
  }
  
  getBalance(): Observable<number[]> {
    return this.http.get(this.endpoint, this.headersProvider.getHeaders())
    .map(result => {
      let r = result.json();
      let balance = [];
      balance[Currency.BTC] = r.BTC;
      balance[Currency.LTC] = r.LTC;
      balance[Currency.ETH] = r.ETH;
      this.balance = balance;
      return balance;
    })
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  getUserWallets(): Observable<UserWallet[]> {
    return this.http.get(this.walletEndpoint, this.headersProvider.getHeaders())
    .map(result => {
      this.wallets = result.json().map(r => new UserWallet(r));
      return this.wallets;
    });
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

export class UserWallet {
  constructor(r: any) {
    this.address = r.address;
    this.currency = r.currency.id;
  }

  address: string;
  currency: Currency;
}
