//  Add your code here
const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: {
    type: String,
    required: true,
  },
});

const Celebrity = mongoose.model("celebrity", celebritySchema);

module.exports = { Celebrity };
