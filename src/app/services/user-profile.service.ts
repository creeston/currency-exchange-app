import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PaymentRequisite } from '../services/payment-method.service';
import { AuthService } from '../auth.service';
import { HeadersProvider } from './headers-provider';
import { ContactInformation } from './contact-information.service';

@Injectable()
export class UserProfileService {
  private currentProfileEndpoint: string = 'https://still-escarpment-16037.herokuapp.com/current_user_profile';
  private usersEndpoint: string = 'https://still-escarpment-16037.herokuapp.com/user_profiles/';

  currentUser: UserProfile;

  constructor(private http: Http, private headersProvider: HeadersProvider) {
  }

  getCurrentUser(): Observable<UserProfile>{
    return this.http.get(this.currentProfileEndpoint, this.headersProvider.getHeaders())
    .map(response => {
      let user = new UserProfile(response.json());
      this.currentUser = user;
      return user;
    })
    .catch((error:any) => {
      console.log(error);
      return Observable.throw(error.json() || 'Server error')}
    );
  }

  getUser(userId: number): Observable<UserProfile>{
    return this.http.get(`${this.usersEndpoint}${userId}.json`, this.headersProvider.getHeaders())
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
    if (r.rating && r.rating.rate__avg) {
      this.rating = Number((r.rating.rate__avg).toFixed(1));
    } else {
      this.rating = 0;
    }
    this.paymentRequisites = r.payment_requisites && r.payment_requisites.map(r => new PaymentRequisite(r));
    this.contactInformation = r.contact_information && r.contact_information.map(r => new ContactInformation(r))
  }

  id: number;
  completedTrades: number;
  email: string;
  username: string;
  rating: number;
  paymentRequisites: PaymentRequisite[];
  contactInformation: ContactInformation[];
}