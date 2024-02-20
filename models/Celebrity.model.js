//  Add your code here
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);


const celebritySchema = new mongoose.Schema({
  name: {type: String, required: true},
  occupation: {type: String},
  catchPhrase: {type: String},
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;