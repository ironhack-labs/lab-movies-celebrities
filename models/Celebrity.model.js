//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    title: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
);

const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;
