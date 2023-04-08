const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "celebs" }],
});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
