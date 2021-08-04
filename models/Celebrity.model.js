// Iteration#2 The Celebrity Model
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Celebrity", celebritySchema);
