import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import {Router} from '@angular/router';
@Component({
  templateUrl:'./admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {


  _eventArray: Array<any>;
  _http: HttpClient;
  _errorMessage: String = "";
  myEvents: Array<any>;


  public site='http://localhost:1337/Home/';

  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, private router: Router) {
    this._http = http;
    this.getAllEvent();

  }


  stuff(arr) {
    this.myEvents = []
    for (var i =0; i < arr.length; i++) {
      if (arr[i].attendees.includes(sessionStorage.getItem('name')))
      {
        this.myEvents.push(arr[i]);
      }
    }

  }
  getAllEvent() {

    const url = this.site + 'Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
          console.log(result.events);

          this._eventArray = result.events;
          this.stuff(this._eventArray)
        },

        error =>{
          // Let user know about the error.
          this._errorMessage = error;
        });
  }

  unattendEvent(event) {
    let arr = event.attendees;

    arr = arr.filter(x => x !== sessionStorage.getItem('name'));

    this.http.post(this.site + "EditEvent",
      {
        _id: event._id,
        attendees: arr,

      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.getAllEvent()
        },
        // An error occurred. Data is not received.
        error => {
          this._errorMessage = error;
        });
  }


}
