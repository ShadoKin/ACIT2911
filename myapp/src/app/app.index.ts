import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './index.html',
  styleUrls: ['./index.css']

})

export class IndexComponent {
  _productArray: Array<any>;
  _http: HttpClient;
  _errorMessage: String = "";
  eventName: String;
  date: String;
  description: String;
  time: String;
  attendees: Array<any>;
  public site='http://localhost:1337/Home/';

  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, private router: Router) {
    this._http = http;
    this.getAllProduct();

  }

  getAllProduct() {

    const url = this.site + 'Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
          console.log(result.products);

          this._productArray = result.products;
        },

        error =>{
          // Let user know about the error.
          this._errorMessage = error;
        });
  }

  attendEvent(event) {
    if (event.attendees.includes(sessionStorage.getItem('name')))
    {
      return false;
    }
    if (sessionStorage.getItem('auth_token') != null) {
      event.attendees.push(sessionStorage.getItem('name'))

      this.http.post(this.site + "EditEvent",
        {
          _id: event._id,
          attendees: event.attendees,

        })
        .subscribe(
          // Data is received from the post request.
          (data) => {
            // Inspect the data to know how to parse it.
            console.log("POST call successful. Inspect response.",
              JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
          },
          // An error occurred. Data is not received.
          error => {
            this._errorMessage = error;
          });
    } else {
      this.router.navigate(['/page-c']);
    }

  }



}
