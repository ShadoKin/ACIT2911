const Product = require('../Models/Product');

class ProductRepo {
    ProductRepo() {

    }

    async allProducts() {
        let products = await Product.find().exec();
        return products;
    }

    async getProductByID(id) {  
        let product = await Product.findOne({_id:id}).exec();
        return product;
    }

    async getProductByName(name) {  
        let product = await Product.findOne({name:name}).exec();
        return product;
    }

    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem =  await Product.find({_id:id}).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }
    
    async update(editedObj) {   
    
        let response = {
            obj:          editedObj,
            errorMessage: "" };
    
        try {
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            let productObject = await this.getProductByID(editedObj.id);
            
    
            if(productObject) {
                
    
                let updated = await Product.updateOne(
                    { _id: editedObj.id}, 

                    {$set:  {   name: editedObj.name,
                                // type: editedObj.type,
                                // manufacturer: editedObj.manufacturer,
                                description: editedObj.description,
                                price: editedObj.price,
                             }}
    
                    // {$set: { 
                    //     attendees: editedObj.attendees
                              
                    // }}
                    ); 
    
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
            
                else {
                    response.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
                
     
            else {
                response.errorMessage = "This product cannot be found" };
                return response; 
            }
    
              
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }

    async create(tempObj) {
        try {
         
            var error = await tempObj.validateSync();
    
            
            if(error) {
                let response = {
                    obj:          tempObj,
                    errorMessage: error.message };
    
                return response; 
            } 
    
            
            const result = await tempObj.save();
    
            
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        
        catch (err) {
            let response = {
                obj:          tempObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 





}

module.exports = ProductRepo;