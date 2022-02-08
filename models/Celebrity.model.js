const { Schema, model } = require("mongoose");

const celebritiesSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Celebrity", celebritiesSchema);