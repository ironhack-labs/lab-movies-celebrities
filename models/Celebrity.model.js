const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
    set: (value) => value.charAt(0).toUpperCase() + value.substring(1),
  },
  occupation: {
    type: String,
    default: "unknown",
    minlength: 2,
    maxlength: 100,
    trim: true,
  },

  catchPhrase: {
    type: String,
    required: true,
    trim: true,
  },
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
