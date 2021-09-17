const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  stars: {
    type: [String],
  },
  image: {
    type: String,
    default:
      "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg",
  },
  description: {
    type: String,
  },
  showtimes: {
    type: [String],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
