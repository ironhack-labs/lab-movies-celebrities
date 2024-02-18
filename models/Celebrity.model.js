//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
  {
    name: {
      type: String
    },
    ocupation: {
      type: String
    },
    catchPhrase: {
      type: String
    }
  }
)

const Celebrity = mongoose.model('celebrity', celebritySchema);

module.exports = Celebrity;