import { Component } from '@angular/core';
import { ApiService } from './ApiService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {routing} from './app.routing';
import { Router } from '@angular/router';

@Component({
  templateUrl:'./register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  public site='http://localhost:1337/';
  _apiService:ApiService;
  _username: String;
  _password: String;
  _passwordConfirm: String;
  _email: String;
  _firstName: String;
  _lastName: String;
  _errorMessage: String = "";

  constructor(private http: HttpClient, private router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);

  }

  redir(){
    this.router.navigate(['/page-a']);
  }

  registerUser() {

    this.http.post(this.site + "User/CreateUser",
      {
        username: this._username,
        password: this._password,
        passwordConfirm: this._passwordConfirm,
        email: this._email,
        firstName: this._firstName,
        lastName: this._lastName,
        roles: ['User']
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.redir();
          },
        // An error occurred. Data is not received.
        error => {
          this._errorMessage = error;
        });
      
  }
















}
