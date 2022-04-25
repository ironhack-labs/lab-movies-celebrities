//  Add your code here
//  we can use schema because of mongoose so everytime we want a schema we require mongoose
const { Schema, model } = require('mongoose');

//  example of one to many
const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});
//  the const here is a just a variable name, it could be whatever

const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;
