//  Add your code const { Schema, model, default: mongoose } = require('mongoose');
const { Schema, model} = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

module.exports= model('Celebrity', celebritySchema);
