const Deleted = require('../Models/Deleted');

class DeletedRepo {
    DeletedRepo() {}

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

module.exports = DeletedRepo;