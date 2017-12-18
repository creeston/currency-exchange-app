import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HeadersProvider } from './headers-provider';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class RegistrationService {
  private endpoint: string = "https://still-escarpment-16037.herokuapp.com/register/"
  private nameUniquenessEndpoint: string = "https://still-escarpment-16037.herokuapp.com/is_name_exist/"

  constructor(private http: Http, private headersProvider: HeadersProvider) { }

  registerUser(info: RegistrationInfo): Observable<boolean> {
    return this.http.post(this.endpoint, JSON.stringify(new JRegistrationInfo(info)) ,this.headersProvider.getHeadersWithoutAuth())
    .map(result => true)
    .catch((error:any) => Observable.throw(error.json()));
  }

  isNameUnique(name: string): Observable<boolean> {
    return this.http.post(this.nameUniquenessEndpoint, JSON.stringify({'name': name}), this.headersProvider.getHeadersWithoutAuth())
    .map(result => {
      return !result.json();
    });
  }
}

export class JRegistrationInfo {
  constructor(info: RegistrationInfo) {
    this.email = info.Email;
    this.confirmation_code = info.ConfirmationCode;
    this.password = info.Password;
    this.username = info.Username;
  }
  email: string;
  password: string;
  username: string;
  confirmation_code: string;
}

export class RegistrationInfo {
  public Username: string;
  public Password: string;
  public RepeatedPassword: string;
  public Email: string;
  public ConfirmationCode: string;
}
