const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A name of a movie is required"],
  },
  genre: {
    type: String,
  },
  plot: {
    type: String,
  },
  cast: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Celebrity",
    default: [],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
