import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { UserLogin1 } from './user.model';
import { profile } from './user.model';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static getUser() {
    throw new Error('Method not implemented.');
  }
  testName = "Sandeep Kumar";
  token = `Bearer ${localStorage.getItem('token')}`
  header = new HttpHeaders({
    "Authorization": this.token

  });
  userData: any = []


  selectedUser: User = {
    fullName: "",
    email: "",
    password: ""
  };

  selectedLogin: UserLogin1 = {
    email: "",
    password: ""
  };

  userProfile: profile = {
    fullName: ""
  };

  constructor(public http: HttpClient) { }


  getDates() {
    return this.http.get(environment.apiBaseUrl + '/data', { headers: this.header });
  }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  profileData() {
    return this.http.post(environment.apiBaseUrl + '/dataName', { "fullName": this.testName })
  }


  postUser1(user1: UserLogin1) {
    return this.http.post(environment.apiBaseUrl + '/login', user1);
  }

  getUser() {
    return this.http.get(environment.apiBaseUrl + '/data', { headers: this.header });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getDecodedAccessToken(token: string): any {
    try {
      console.log('toeken coded', jwt_decode(token))
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
