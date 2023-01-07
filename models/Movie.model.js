const { Schema, model } = require("mongoose");
require("./Celebrity.model")

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{
    type: Schema.Types.ObjectId,
    ref: "CelebrityModel"
    }]
});

const movieModel = model("movies", movieSchema);

module.exports = movieModel;