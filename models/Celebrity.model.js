const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  { timestamps: true }
);

module.experts = model("Celebrity", celebritySchema);
