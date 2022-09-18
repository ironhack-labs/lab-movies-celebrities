const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true,
  },
  genre: String,
  plot: String,
  cast: [ {type: mongoose.Schema.Types.ObjectId, ref: 'celebrity'} ] ,
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = { Movie };