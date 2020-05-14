import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './update.html'
})

export class UpdateComponent implements OnInit{
  _http: HttpClient;
  public site='http://localhost:1337/Home/';
  _id: object;
  _arr: Array<any>;
  _errorMessage: String = "";
  _productArray: Array<any>;

  _name:String;
  _type:String;
  _manufacturer:String;
  _description:String;
  _price:String;

  id: String;

  productName: String;
  productType: String;
  productManufacturer: String;
  productDescription: String;
  productPrice: String;



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];      
      console.log(this.id);
    });
    this.getProduct();
  }
  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, private route: ActivatedRoute, public router: Router) {
    this._http = http;
  }


  updateProduct() {
    // This free online service receives post submissions.
    this.http.put(this.site + "EditProduct",
        {
            id: this.id,
            name:  this._name,
            // type: this._type,
            // manufacturer: this._manufacturer,
            description: this._description,
            price: this._price
        })
    .subscribe(
        // Data is received from the post request.
        (data) => {
            // Inspect the data to know how to parse it.
            console.log("POST call successful. Inspect response.", 
                        JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
            this.router.navigate(['./manage']);

        },
        // An error occurred. Data is not received. 
        error => {
            this._errorMessage = error;                
        });
}

  getProduct() {
    let url = this.site + 'Display?id=' + this.id;
  
    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {
            this.productName = result.product.name;
            // this.productType = result.product.type;
            // this.productManufacturer = result.product.manufacturer;
            this.productDescription = result.product.description;
            this.productPrice = result.product.price;
        }, 
  
        error =>{
          // Let user know about the error.
            this._errorMessage = error;
        })
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


  // parse(id){
  //   this._arr = []
  //   this._attendees = []
  //   for (let i = 0; i < this._eventArray.length; i++) {
  //     if (this._eventArray[i]._id == id) {
  //         this._arr.push(this._eventArray[i]);
  //         this._attendees.push(this._eventArray[i].attendees);
  //         console.log(this._arr);
  //     }
  //   }

  // }





}
