
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    // author: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true
  }
);



const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
