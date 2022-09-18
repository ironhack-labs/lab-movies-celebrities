const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  occupation: String,
  catchPhrase: {
    required: true,
    type: String,
  },
});

const Celebrity = mongoose.model("celebrity", celebritySchema);

module.exports = { Celebrity };
