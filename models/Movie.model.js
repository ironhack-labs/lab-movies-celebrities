const { Schema, model } = require("mongoose");

const moviesSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
});

const Movie = model("Movie", moviesSchema);

module.exports = Movie;
