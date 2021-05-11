const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast:[{type: Schema.Types.ObjectId, ref: "celebritiy"}]
  },
  {
    timestamps: true
  }
);

const MovieModel = mongoose.model("movie", MovieSchema)
module.exports = MovieModel;