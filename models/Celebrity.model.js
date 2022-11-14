const mongoose = require("mongoose");

//  Add your code here
const { Schema, model } = mongoose;

const celebritySchema = new Schema({
  name: String,
  occupation: { type: String, default: "unknown" },
  catchPhrase: String,
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
