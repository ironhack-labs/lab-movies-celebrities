//  Add your code here
const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add the celebrity name"]
    },
    occupation: {
      type: String,
      required: [true, "Add the celebrity occupation"]
    },
    catchPhrase: {
      type: String,
      required: [true, "Add the celebrity catchPhrase"]
    },
  }
)

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity