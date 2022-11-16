//  Add your code here

const { Schema, model } = require("mongoose");
const celebSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  catchPhrase: { type: String, required: true },
});
module.exports = model("Celeb", celebSchema);
