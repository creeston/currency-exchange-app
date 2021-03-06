import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth.service';
import { HeadersProvider } from './headers-provider';
import { Constants } from '../constants'


@Injectable()
export class PaymentMethodService {
  private endpoint: string = `${Constants.HostName}/payment_requisite`;
  
  constructor(private http: Http, private headersProvider: HeadersProvider) {
  }
  
  getUserPaymentRequisites(): Observable<PaymentRequisite[]> {
    return this.http.get(`${this.endpoint}.json`, this.headersProvider.getHeaders())
    .map(this.mapRequisites)
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  addPaymentRequisite(requisite: PaymentRequisite): Observable<boolean> {
    return this.http.post(`${this.endpoint}.json`, JSON.stringify(new JRequisite(requisite)), this.headersProvider.getHeaders())
    .map(result => true)
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  mapRequisites(response: Response): PaymentRequisite[] {
      return response.json().map(r => new PaymentRequisite(r));
  }

  removeUserPayment(id: number): Observable<boolean> {
    return this.http.delete(`${this.endpoint}/${id}.json`, this.headersProvider.getHeaders())
    .map(r => true);
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
    this.id = r.id;
  }

  method: PaymentMethod;
  data: string;
  id: number;
}