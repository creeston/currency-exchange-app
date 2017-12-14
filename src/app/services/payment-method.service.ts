import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentMethodService {
  public token: string;
  private endpoint: string = 'https://still-escarpment-16037.herokuapp.com/payment_requisite.json';
  private headers: Headers;
  
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.headers = new Headers(
      {'Content-Type': 'application/json', 'Authorization': `Token ${this.token}`});
  }
  
  getUserPaymentRequisites(): Observable<PaymentRequisite[]> {
    return this.http.get(this.endpoint, {headers: this.headers})
    .map(this.mapRequisites)
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  addPaymentRequisite(requisite: PaymentRequisite): Observable<boolean> {
    return this.http.post(this.endpoint, JSON.stringify(new JRequisite(requisite)), {headers: this.headers})
    .map(result => true)
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  mapRequisites(response: Response): PaymentRequisite[] {
      return response.json().map(r => new PaymentRequisite(r));
  }

}


export enum PaymentMethod {
  PayPal = 1,
  YandexMoney = 2,
  QIWI = 3
}

class JRequisite {
  constructor(r: PaymentRequisite) {
    this.payment_method = r.method;
    this.payment_method_data = r.data;
  }

  payment_method: number;
  payment_method_data: string;
}

export class PaymentRequisite {
  constructor(r: any) {
    if (r == null) {
      return;
    }
    this.method = r.payment_method;
    this.data = r.payment_method_data;
  }

  method: PaymentMethod;
  data: string;
}