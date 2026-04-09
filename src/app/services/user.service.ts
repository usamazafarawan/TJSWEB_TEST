import { Injectable } from '@angular/core';
import { NbAuthJWTToken } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  setToken(token: NbAuthJWTToken) {
    localStorage.setItem('token', token.getPayload().data);
    localStorage.setItem('access-token', token.getValue());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('access-token');
  }
  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else
      return null;
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
