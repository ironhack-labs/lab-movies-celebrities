const mongoose = require("mongoose");

//  Add your code here

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Occupation is required"],
  },
  catchPhrase: {
    type: String,
    required: [true, "Catch phrase is required"],
  },
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
