const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebrityModel = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

module.exports = mongoose.model("Celebrity", celebrityModel);
