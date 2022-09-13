const mongoose = require("mongoose");
const Celebrity = require("./Celebrity.model");

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast: {
    type: [],
    ref: "Celebrity",
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
