import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})

export class ProductsComponent {
  _http: HttpClient;
  _errorMessage: String = "";
  public site='http://localhost:1337/Home/';

  _eventsArray: Array<any>;
  _type: String;
  _manufacturer: String;
  _description: String;
  _name: String;
  _price: String;

  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, private router: Router) {
    this._http = http;
    this.getAllEvent()
  }
  
  
  getAllEvent() {

    if (sessionStorage.getItem('roles') != null) {
      let user_roles = sessionStorage.getItem('roles')
      let x = user_roles.split(',');
      if (x.includes('Admin')) {
        const url = this.site + 'Index'
        this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              console.log(result.events);
              this._eventsArray = result.events;
            },

            error =>{
              // Let user know about the error.
              this._errorMessage = error;
            });
      } else {

        this.router.navigate(['/page-a']);
      }
    }  else {
      this.router.navigate(['/page-a']);
    }
}


  view(event){
     let x = event._id
     this.router.navigate(['/results'], { queryParams: { _id: x } });
  }

  deleteEvent(event) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      "body": { _id: event._id}
    };

    let url = this.site + "Delete"
    this.http.delete(  url , httpOptions)
      .subscribe(
        // Data is received from the post request.
        (data) => {
          this._errorMessage = data["errorMessage"];



        },
        // An error occurred. Data is not received.
        error  => {
          this._errorMessage = error;
        });

  }




}
