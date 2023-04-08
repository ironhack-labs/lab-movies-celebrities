const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const celebrityModel = model("celebritie", celebritySchema);
module.exports = celebrityModel;
