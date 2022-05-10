const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    tilte: String,
    genre: String,
    plot: String,
    cast: { type: Schema.Types.ObjectId, ref: "Movie" },
  },
  { timestamps: true }
);

module.exports = model("Movie", movieSchema);
