import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HeadersProvider } from './headers-provider';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ContactInformationService {
  private endpoint: string = "https://still-escarpment-16037.herokuapp.com/contact_information";
  

  constructor(private http: Http, private headersProvider: HeadersProvider) { }

  listContactInformation(): Observable<ContactInformation[]> {
    return this.http.get(`${this.endpoint}.json`, this.headersProvider.getHeaders())
    .map(result => result.json().map(r => new ContactInformation(r)))
  }

  addContactInformation(info: ContactInformation): Observable<boolean> {
    return this.http.post(`${this.endpoint}.json`, JSON.stringify(new JContactInformation(info)), this.headersProvider.getHeaders())
    .map(r => true);
  }

  removeContactInformation(id: number): Observable<boolean> {
    return this.http.delete(`${this.endpoint}/${id}.json`, this.headersProvider.getHeaders())
    .map(r => true);
  }

}

class JContactInformation {
  constructor(info: ContactInformation) {
    this.contact_method = info.method;
    this.contact_method_data = info.data;
  }

  contact_method_data: string;
  contact_method: number;
}

export class ContactInformation {
  constructor(r: any) {
    if (!r) {
      return;
    }
    this.method = r.contact_method;
    this.data = r.contact_method_data;
    this.id = r.id;
  }
  
  id: number;
  method: ContactMethod;
  data: string;
}

export enum ContactMethod {
  Vk = 1,
  Telegram = 2,
  Email = 3, 
  Facebook = 4, 
  Instagram = 5
}