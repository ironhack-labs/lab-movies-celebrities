const mongoose = require("mongoose");

const CelebritySchema = mongoose.Schema({
    name: {
      type: String,
    },
    occupation: {
      type: String,
    },
    catchPhrase: {
      type: String,
    },
  });
  
  const Celebrity = mongoose.model("Celebrity", CelebritySchema);
  module.exports = Celebrity;