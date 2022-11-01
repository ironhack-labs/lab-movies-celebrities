//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: {
      type: String,
    },
    occupation: {
      type: String,
    },
    catchPhrase: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

// Celebrity collection in mongoDB
const Celebrity = model("Celebrity", celebritySchema);

// to use Celebrity in a different file
module.exports = Celebrity;
