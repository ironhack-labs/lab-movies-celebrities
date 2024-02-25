const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  // TODO: write the schema
  name: { type: String, required: true, unique: true },
  occupation: { type: String, required: true },
  catchPhrase: { type: String, required: true },
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
