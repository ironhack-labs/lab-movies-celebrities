const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast:[{}]
}, {
  timestamps: true
})

const Movie = model("Movie", userSchema);

module.exports = Movie;