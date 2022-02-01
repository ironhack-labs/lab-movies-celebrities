//initiate connection using mongoDB mongoose
const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  //cast is an array of 'celebrities' therefore ref is to celebrity model
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
},
{
  timestamps: true
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
