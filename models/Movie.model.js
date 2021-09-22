//1 -- Importaciones
const mongoose = require("mongoose");

//2 -- Schema
const movieSchema = mongoose.Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Celebrity",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//3 -- Model
const Movie = mongoose.model("Movie", movieSchema);

//4 -- Exportación

module.exports = Movie;
