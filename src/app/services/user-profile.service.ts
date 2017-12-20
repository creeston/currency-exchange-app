import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { PaymentRequisite } from '../services/payment-method.service';
import { AuthService } from '../auth.service';
import { HeadersProvider } from './headers-provider';
import { ContactInformation } from './contact-information.service';
import { Constants } from '../constants'

@Injectable()
export class UserProfileService {
  private currentProfileEndpoint: string = `${Constants.HostName}/current_user_profile`;
  private usersEndpoint: string = `${Constants.HostName}/user_profiles/`;
  private changePasswordEndpoint: string = `${Constants.HostName}/change_password/`;
  private changeEmailEndpoint: string = `${Constants.HostName}/change_email/`;
  
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

  changeUserPassword(oldPassword: string, newPassowrd: string): Observable<boolean> {
    let json = JSON.stringify({old_password: oldPassword, new_password: newPassowrd})
    return this.http.post(this.changePasswordEndpoint, json, this.headersProvider.getHeaders())
    .map(r => true);
  }

  changeUserEmail(email: string, code: string): Observable<boolean> {
    let json = JSON.stringify({email: email, code: code});
    return this.http.post(this.changeEmailEndpoint, json, this.headersProvider.getHeaders())
    .map(r => true)
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));;
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