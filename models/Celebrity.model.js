const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const celebritySchema = new Schema({
  username: String,
  occupation: String,
  catchPhrase: String
});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
