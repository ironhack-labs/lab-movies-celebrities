const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    ocupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Celebrity", celebritySchema);
