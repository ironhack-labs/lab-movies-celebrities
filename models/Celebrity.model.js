const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
  image: String,
});

const celebrityModel = model("celebrity", celebritySchema);
module.exports = celebrityModel;
