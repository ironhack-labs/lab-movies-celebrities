const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast: Array,
});

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
