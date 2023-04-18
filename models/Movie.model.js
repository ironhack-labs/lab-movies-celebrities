const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      // This refers to the model
      ref: "Celebrity"
    }
  ]
});

const Movie = mongoose.model("Movies", movieSchema);
module.exports = Movie;
