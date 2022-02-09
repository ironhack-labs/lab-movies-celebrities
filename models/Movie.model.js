const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    title: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    default: "Unknown",
  },
  plot: {
    type: String,
    required: true,
    default: "Unknown",
  },
  cast: {
    type: [String],
    required: true,
    default: [],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

// 4. EXPORTACIÓN
module.exports = Movie;
