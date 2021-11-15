const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieModel = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: Array,
});

module.exports = mongoose.model("Movie", movieModel);
