import { Injectable } from '@angular/core';
import { HeadersProvider } from './headers-provider';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Constants } from '../constants'


@Injectable()
export class RateService {
  private endpoint: string = `${Constants.HostName}/rate_ticket`;

  constructor(private http: Http, private headersProvider: HeadersProvider) { }

  rateUser(ticket: RateTicket): Observable<boolean> {
    return this.http.put(`${this.endpoint}/${ticket.id}.json`, {rate: ticket.rate}, this.headersProvider.getHeaders())
    .map(r => true);
  }

}

export class RateTicket {
  constructor(r: any) {
    this.id = r.id;
    this.rate = r.rate;
  }
  id: number;
  rate: number;
}
