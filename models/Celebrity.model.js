const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

// mongoose will turn "Recipe" into the collection "recipes"
const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
