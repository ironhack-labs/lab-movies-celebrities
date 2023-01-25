const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the celebrity is required"],
  },
  occupation: {
    type: String,
    required: [true, "Occupation of the celebrity is required"],
  },
  catchPhrase: {
    type: String,
    required: [true, "Catch phrase of the celebrity is required"],
  },
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
