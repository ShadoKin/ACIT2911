import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './ApiService';
import {routing} from './app.routing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  name = ''
  public site='http://localhost:1337/';
  _apiService:ApiService;
  token  = '';
  _errorMessage: String = "";
  _http: HttpClient;
  _Array: Array<any>;
  constructor(private http: HttpClient, private router: Router) {
    this._apiService = new ApiService(http, this);


  }

  LoginStatus() {
    if (sessionStorage.getItem('auth_token') == null) {
      return 3;
    } else {
      if (sessionStorage.getItem('roles') != null) {
        let user_roles = sessionStorage.getItem('roles')
        let x = user_roles.split(',');
        if (x.includes('Admin')) {
          this.name = sessionStorage.getItem('username');
          return 1;
        } else {
          this.name = sessionStorage.getItem('username');
          return 2;
        }
      }
    }
  }
  logout() {
    sessionStorage.clear();
    this.name = '';


  }
}
