const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  genre: {
    type: String,
  },
  plot: {
    type: String,
  },
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "celebrities" }],
});

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
