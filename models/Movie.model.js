//  Add your code here
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const moment = require("moment");
//schema
const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: {
    type: Schema.Types.ObjectId,
    ref: "celebrities",
  },
  image: String,
  updated: {
    type: Date,
    default: moment(),
  },
});

//modelo
const Movie = model("movies", movieSchema);

//exportación
module.exports = Movie;
