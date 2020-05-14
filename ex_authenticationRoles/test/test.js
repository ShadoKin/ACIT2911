// Import the dependencies for testing
var chai     = require('chai')
var chaiHttp = require('chai-http');
var app      = require('../app.js');

// Configure chai.
chai.use(chaiHttp);
chai.should();

describe("Tests", () => {

    var productID = '';




    //Test for Users
    describe("Users", () => {         
        // Describe test.

        // Perform a POST test.
        it("Tests user values returned by API.", 
            (done) => {
             
             chai.request(app)
                .post(`/User/CreateUser`)
                .set('Content-Type', 'application/json; charset=utf-8')
                .send({'firstName': 'Martin', 'lastName': 'Peng','email':'martin_peng0613@hotmail.com', 'username':'ShadoKin'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log("Showing output.")
                    console.log(JSON.stringify(res.body.firstName));
                    console.log(JSON.stringify(res.body.lastName));
                    console.log(JSON.stringify(res.body.email));
                    console.log(JSON.stringify(res.body.username));
                    res.body.firstName.should.equal('Martin');
                    res.body.lastName.should.equal('Peng');
                    res.body.email.should.equal('martin_peng0613@hotmail.com');
                    res.body.username.should.equal('ShadoKin');
                    
                    
                    done();
                });
        });
    });


    //Test for Products
    describe("Products", () => {


        it("Tests Created product values returned by API.",
            (done) => {
            
                chai.request(app)
                    .post(`/Home/Create`)
                    .set('Content-Type', 'application/json; charset=utf-8')
                    .send({'name':'16GB RAM Stick', 'type':'RAM', 'manufacturer':'Corsair', 'price':89.99, 'description':'Single stick of 16GB RAM 3200Mhz DDR4.'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        console.log("Showing output of Product.");
                        console.log("ID:", JSON.stringify(res.body._id));
                        console.log("Name:", JSON.stringify(res.body.name));
                        console.log("Type:", JSON.stringify(res.body.type));
                        console.log("Manufacturer:", JSON.stringify(res.body.manufacturer));
                        console.log("Price:", JSON.stringify(res.body.price));
                        console.log("Description:", JSON.stringify(res.body.description));
                        res.body.name.should.equal('16GB RAM Stick');
                        res.body.type.should.equal('RAM');
                        res.body.manufacturer.should.equal('Corsair');
                        res.body.price.should.equal(89.99);
                        res.body.description.should.equal('Single stick of 16GB RAM 3200Mhz DDR4.');

                        productID = res.body._id;

                        done();
                    });
            }
        );


        it("Tests Updated product values returned by API.",
            (done) => {
            
                chai.request(app)
                    .put(`/Home/EditProduct`)
                    .set('Content-Type', 'application/json; charset=utf-8')
                    .send({'id': productID, 'name': 'Something New', 'description': 'This is updating the description', 'price': 200})
                    .end((err, res) => {
                        console.log("ID to be updated: " + productID);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        console.log("Showing output of Edit Product.");
                        console.log("ID:", JSON.stringify(res.body.product._id));
                        console.log("Name:", JSON.stringify(res.body.product.name));
                        console.log("Type:", JSON.stringify(res.body.product.type));
                        console.log("Manufacturer:", JSON.stringify(res.body.product.manufacturer));
                        console.log("Price:", JSON.stringify(res.body.product.price));
                        console.log("Description:", JSON.stringify(res.body.product.description));
                        res.body.product.name.should.equal('Something New');
                        res.body.product.type.should.equal('RAM');
                        res.body.product.manufacturer.should.equal('Corsair');
                        res.body.product.price.should.equal('200');
                        res.body.product.description.should.equal('This is updating the description');


                        done();
                    });
            }
        );


        it("Tests Deleted product",
            (done) => {

                chai.request(app)
                .delete(`/Home/Delete`)
                .set('Content-Type', 'application/json; charset=utf-8')
                .send({'_id': productID})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log("Deleting Product with id: " + productID);
                    res.body.answer.should.equal(true);
                    res.body._id.should.equal(productID)
                    done();
                });
            }
        );



        
    });




});
