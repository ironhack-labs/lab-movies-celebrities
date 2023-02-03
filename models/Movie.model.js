const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name of the movie is required"]
    },
    genre: {
      type: String,
      required: [true, "Name of the genre is required"]
    },
    plot: {
      type: String,
      required: [true, "Plot is required"]
    },
    cast: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Celebrity",
      default: [],
    }
  }
)

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;