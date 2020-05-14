import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './manage.html',
  styleUrls: ['./manage.css']
})

export class ManageComponent {
  _productArray: Array<any>;
  _http: HttpClient;
  _errorMessage: String = "";
  _type: String;
  _manufacturer: String;
  _description: String;
  _name: String;
  _price: String;
  _singleProductID: String = "";

  public site='http://localhost:1337/Home/';

  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, private router: Router) {
    this._http = http;
    this.getAllProduct();

  }

  createProduct() {
    console.log("MADE IT ANGULER");
    this.http.post(this.site + "Create",
      {
        type: this._type,
        name: this._name,
        manufacturer: this._manufacturer,
        description: this._description,
        price: this._price,
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
  redir() {
    this.router.navigate(['/manage']);
    location.reload();
  }

  deleteProduct(product) {
    console.log(product);
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        "body": {_id: product}
    };
    this.http.post(this.site + "Deleted/Restore", product)

    let url = this.site + "Delete"
    this.http.delete(url, httpOptions)
        .subscribe(
          // Data is received from the post request.
          (data) => {
            this._errorMessage = data["errorMessage"];
            this.redir();
            },
          // An error occurred. Data is not received.
          error  => {
            this._errorMessage = error;
          });
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
}
