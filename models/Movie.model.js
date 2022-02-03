// models/Movie.model.js

const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  {
    timestamps: true,
  }
);

// 'type: Schema.Types.ObjectId, ref: 'Celebrity'' will create a relation between the `Movie` model and the `Celebrity` model

const Movie = model("Movie", movieSchema);

module.exports = Movie;