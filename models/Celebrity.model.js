//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const celebritySchema = new Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    catchPhrase: { type: String, required: true }

});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;