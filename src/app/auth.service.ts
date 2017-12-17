import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor() { 
    this.reloadToken();
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  reloadToken() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser)
    {
      this.token = currentUser.token;
    }
  }
}
