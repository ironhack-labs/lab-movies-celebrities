//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
    },
  },
  { timestamps: true }
);
const Celebrity = model("celebrity", celebritySchema);
module.exports = Celebrity;
