const { Schema, model } = require("mongoose");

//  Add your code here
const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

module.exports = model("Celebrity", celebritySchema);
