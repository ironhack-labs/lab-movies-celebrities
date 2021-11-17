const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    catchPhrase: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Celebrity", celebritySchema);
