const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String },
  genre: { type: String },
  plot: { type: String },
  cast: [],
});

//
const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
