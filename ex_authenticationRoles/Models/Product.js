var mongoose              = require('mongoose');


var productSchema = mongoose.Schema({
  
  name: {
    type: String,
    unique: true,
    index: true // Index ensures property is unique in db.
  },
  type: {
    type: String
  },
  manufacturer: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  }
});

var Product = module.exports = mongoose.model('Product', productSchema);
module.exports = Product;
