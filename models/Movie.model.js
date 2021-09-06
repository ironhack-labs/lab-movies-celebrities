const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [Schema.Types.ObjectId],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
