const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    genere: { type: String },
    plot: { type: String },
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }]
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", schema);

module.exports = Movie;