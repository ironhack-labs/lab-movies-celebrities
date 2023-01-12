const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  image_url: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "celebrities",
    },
  ],
});

const MovieModel = model("movies", movieSchema);

module.exports = MovieModel;
