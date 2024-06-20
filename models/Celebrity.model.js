//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
});

module.exports = model("Celebrity", celebritySchema);
