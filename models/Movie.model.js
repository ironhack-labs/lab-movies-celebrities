// models/Movie.model.js

const mongoose = require("mongoose");

// Define the schema for the Movie model
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrity", // Reference to the Celebrity model
    },
  ],
});

// Create and export the Movie model
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
