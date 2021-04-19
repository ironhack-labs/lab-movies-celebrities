const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
  {
    version: false,
    timestamps: true
  }
);

module.exports = model("Celebrity", celebritySchema);
