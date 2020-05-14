import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiService} from './ApiService';
import {routing} from './app.routing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  public site='http://localhost:1337/';
  password  = '';
  username  = '';
  token  = '';
  _apiService : ApiService;



  constructor(private http: HttpClient, private router: Router) {
    this._apiService = new ApiService(http, this);


  }

  getRole() {
    this._apiService.getData('User/SecureAreaJwt',
      this.managerDataCallback);
  }
  // Callback needs a pointer '_this' to current instance.
  managerDataCallback(result, _this) {
    if(result.errorMessage == "") {

      _this.reqInfo = result.reqInfo;
      _this.roles = result.roles;
      _this.username = result.reqInfo.username;
      _this.name = '' + result.person.firstName + ' ' + result.person.lastName;
      sessionStorage.setItem('name', _this.name);
      sessionStorage.setItem('roles', _this.roles);
      sessionStorage.setItem('username', _this.username);
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }



  login() {
    let url = this.site + "auth";

    // This free online service receives post submissions.
    this.http.post(url, {
      username:  this.username,
      password:  this.password,
    })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log(JSON.stringify(data) + 'hi');

          if(data["token"]  != null)  {
            this.token = data["token"]
            sessionStorage.setItem('auth_token', data["token"]);
            this.router.navigate(['/admin']);
            this.getRole();

          }
        },
        // An error occurred. Data is not received.
        error => {
          alert(JSON.stringify(error));
        });




  }
}
