//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebSchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const CelebModel = mongoose.model("celebrity", celebSchema);

module.exports = CelebModel;
