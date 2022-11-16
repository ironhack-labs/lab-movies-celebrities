const mongoose = require("mongoose");

//  Add your code here
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
