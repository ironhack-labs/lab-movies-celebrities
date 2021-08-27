// require schema and model from mongoose
const { Schema, model } = require("mongoose");

// define the schema for the model
const movieSchema = new Schema({
  title: {
    type: String,
    max: 40,
  },
  genre: {
    type: String,
    enum: [
      "Drama",
      "Comedy",
      "Thriller",
      "Documentary",
      "Fantasy",
      "Action",
      "Other",
    ],
  },
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "CelebrityModel" }],
});

// export the model
const MovieModel = model("MovieModel", movieSchema);

module.exports = MovieModel;
