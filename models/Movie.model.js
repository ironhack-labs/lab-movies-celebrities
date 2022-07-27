const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  plot: {
    type: String,
    required: [true, "Plot is required"],
  },
  cast: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Celebrity",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;