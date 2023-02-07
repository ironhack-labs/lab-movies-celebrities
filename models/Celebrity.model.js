const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type : String,
    required : [true, "Name of celebrity is required"]
  },
    occupation: {
      type: String
    },
    catchPhrase: {
      type : String
    }
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity