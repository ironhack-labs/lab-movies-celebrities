const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    genre: {
      type: String,
    },
    plot: {
      type: String,
    },
    cast: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
