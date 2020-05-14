const ProductRepo = require('../Data/ProductRepo');
const _product = new ProductRepo;
const product = require('../Models/Product')

exports.Index = async function(req,res) {
    
    let products = await _product.allProducts();
    if(products!=null) {
        res.json({products:products})
    }
    else {
        res.json({products:[]})
    }
}


exports.Display = async function(request, response) {
    // request.query used to get url parameter.
    let productID  = request.query.id; 
    
    let productObj = await _product.getProductByID(productID);
    response.json( { product:productObj });
}


exports.Edit = async function(req,res){
    console.log('made it node')
    productID = req.body.id
    console.log(productID)

    
    

    let tempProduct  = new product( {
        _id: productID,
        name:  req.body.name,
        // type: req.body.type,
        // manufacturer: req.body.manufacturer,
        description: req.body.description,
        price: req.body.price
    });

    console.log(JSON.stringify(tempProduct))
    let responseObject = await _product.update(tempProduct);


    if(responseObject.errorMessage == "")  {
        let product = await _product.getProductByID(productID)
        res.json({product}) 
    }

    else {
        res.json( { 
            user:      responseObject.obj, 
            errorMessage: responseObject.errorMessage });
    }
}


exports.Delete = async function(req, res) {
    let id           = req.body._id;
    let deletedItem  = await _product.delete(id);
    console.log(JSON.stringify(deletedItem));

    res.json({
        answer: true,
        _id: id
    })
}

exports.Create = async function(req, res) {

    let tempProductObj  = new product( {
        name: req.body.name,
        type: req.body.type,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        description: req.body.description
    });

    res.json({
        _id: tempProductObj._id,
        name: req.body.name,
        type: req.body.type,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        description: req.body.description
    })

    
    let responseObject = await _product.create(tempProductObj);

    
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        res.json({ event:responseObject.obj,
                                            errorMessage:""});
    }
    
    else {
        console.log("An error occured. Product not created.");
        res.json( {
                        Event:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};
