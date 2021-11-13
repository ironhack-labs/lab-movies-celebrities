const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast:Array
  }
);



const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;