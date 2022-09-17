const mongoose = require("mongoose");

const movieSchema = new mongoose.schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: _id }],
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = { Movie };
