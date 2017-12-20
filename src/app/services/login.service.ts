import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { UserProfileService } from './user-profile.service';
import { AuthService } from '../auth.service';
import { Constants } from '../constants'


@Injectable()
export class LoginService {
  constructor(private http: Http, private authService: AuthService) {
  }
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${Constants.HostName}/api-token-auth.json`, JSON.stringify(
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
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
        this.authService.reloadToken();
        return true;
      } else {
        return false;
      }
    })
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
