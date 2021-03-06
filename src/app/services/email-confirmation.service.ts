import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HeadersProvider } from './headers-provider';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Constants } from '../constants'


@Injectable()
export class EmailConfirmationService {
  private endpoint: string = `${Constants.HostName}/send_email_confirmation`;

  constructor(private http: Http, private headersProvider: HeadersProvider) { }

  sendEmailConfirmationCode(email: string): Observable<boolean> {
    return this.http.post(this.endpoint, JSON.stringify({"email": email}), {headers: new Headers({'Content-Type': 'application/json'})})
    .map(result => true)
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));;
  }

}
