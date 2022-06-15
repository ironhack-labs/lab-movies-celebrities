//  Add your code here
const { Schema, model, SchemaType } = require("mongoose");

//Schema
const celebritySchema = new Schema(
  {
    name: String,
    ocupation: String,
    catchPhrase: String,
  },
  { timestamps: true }
);

//exports

module.exports = model("Celebrity", celebritySchema);
