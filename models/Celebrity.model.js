//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritiesSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, default: "unknown" },
  catchPhrase: { type: String, required: true },
});

const Celebrities = mongoose.model("Celebrities", celebritiesSchema);

module.exports = Celebrities;
