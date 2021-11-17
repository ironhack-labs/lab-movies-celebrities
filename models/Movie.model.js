const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String },
  genre: { type: String },
  plot: { type: String },
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Celebrity" }],
});

//
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
