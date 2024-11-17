//  Add your code here
const mongoose = require('mongoose');
const { Schema } = mongoose;

const celebritySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
  },
  ocupation: {
    type: String,
    required: true
  },
  catchPhrase: {
    type: String
  },
})



const celebrity = mongoose.model('celebrity', celebritySchema)

module.exports = celebrity;
