const mongoose = require("mongoose");

const movie_schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  plot: {
    type: String,
  },
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "celeb" }],
});

const Movie = mongoose.model("movie", movie_schema);

module.exports = { Movie };
