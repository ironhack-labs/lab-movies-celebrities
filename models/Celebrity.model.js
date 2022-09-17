//  Add your code here
const mongoose = require("mongoose");

const celebritiesSchema = new mongoose.Schema({
  name: String,
  occupation: String,
  cathcPhrase: String,
});

const Celebrity = mongoose.model("celebrity", celebritiesSchema);

module.exports = { Celebrity };
