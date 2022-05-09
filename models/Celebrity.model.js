const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: String,
  catchPhrase: {
    type: String,
    max: 200,
  },
});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
