import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { HttpHeaders } from '@angular/common/http/src/headers';

@Injectable()
export class LoginService {
  public token: string;
  
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.post('https://still-escarpment-16037.herokuapp.com/api-token-auth.json', JSON.stringify(
      { 
        username: username, 
        password: password 
      }), {headers: new Headers({'Content-Type': 'application/json'})})
    .map((response: Response) => {
      if (!response.ok) {
        return false;
      }
      let token = response.json() && response.json().token;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        return true;
      } else {
        return false;
      }
    })
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }
  
  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
