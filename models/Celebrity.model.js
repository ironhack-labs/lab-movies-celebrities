//  Add your code here
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const celebSchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celeb = mongoose.model("Celeb", celebSchema);
module.exports = Celeb;