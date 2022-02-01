const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    //Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
