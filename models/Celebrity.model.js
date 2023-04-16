//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  occupation: String,
  catchPhrase: String,
});

const celebrityModel = model("celebrityModel", celebritySchema);
module.exports = celebrityModel;
