const mongoose = require("mongoose");

const CelebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celebrity = mongoose.model("Celebrity", CelebritySchema);

module.exports = Celebrity;
