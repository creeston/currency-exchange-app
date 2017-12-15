import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PaymentRequisite } from '../services/payment-method.service';

@Injectable()
export class UserProfileService {
  public token: string;
  private currentProfileEndpoint: string = 'https://still-escarpment-16037.herokuapp.com/current_user_profile';
  private headers: Headers;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.headers = new Headers(
      {'Content-Type': 'application/json', 'Authorization': `Token ${this.token}`});
  }

  getCurrentUser(): Observable<UserProfile>{
    return this.http.get(this.currentProfileEndpoint, {headers: this.headers})
    .map(response => {
      return new UserProfile(response.json());
    })
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }
}

export class UserProfile {
  constructor(r: any) {
    if (r === null) {
      return;
    }
    this.id = r.id;
    this.completedTrades = r.completed_trades_amount;
    this.email = r.email;
    this.username = r.username;
    if (r.rating.rate_avg) {
      this.rating = r.rating.rate_avg;
    } else {
      this.rating = 0;
    }
    this.paymentRequisites = r.payment_requisites.map(r => new PaymentRequisite(r));
  }

  id: number;
  completedTrades: number;
  email: string;
  username: string;
  rating: number;
  paymentRequisites: PaymentRequisite[]
}