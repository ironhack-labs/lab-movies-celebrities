const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: { type: String, required: true },
    occupation: String,
    catchPhrase: { type: String, required: true },
  },
  { timestamps: true }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
