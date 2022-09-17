const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celebrity = mongoose.model("celebrity", celebritySchema);

module.exports = { Celebrity };
