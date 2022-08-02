const { Schema, model } = require("mongoose");
const celebritiesSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
)

module.exports = model("Celebrity", celebritiesSchema); //first argument is the name of the model, must be capitalized and singular
