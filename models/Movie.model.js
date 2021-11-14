const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
    set: (value) => value.charAt(0).toUpperCase() + value.substring(1),
  },
  genre: {
    type: String,
    default: "unknown",
    minlength: 2,
    maxlength: 100,
    trim: true,
  },

  plot: {
    type: String,
    required: true,
    trim: true,
  },
  cast: [{ type: mongoose.Types.ObjectId, ref: "Celebrity" }],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
