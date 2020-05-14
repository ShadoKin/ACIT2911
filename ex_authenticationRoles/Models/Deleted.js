var mongoose              = require('mongoose');


var deletedSchema = mongoose.Schema({
  
  name: {
    type: String,
    index:true // Index ensures property is unique in db.
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

var Deleted = module.exports = mongoose.model('Deleted', deletedSchema);
module.exports = Deleted;
