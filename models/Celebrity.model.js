const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const celebritySchema = new Schema(
  {
    // model properties
    name: String,
    occupation: String,
    catchPhrase: String

  },
  {
    timestamps: true
  }
);

module.exports = model("Celebrity", celebritySchema);
