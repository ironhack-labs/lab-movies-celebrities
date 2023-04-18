const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  // cast: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "celebrity",
  //   },
  // ],
});

const movieModel = model("movie", movieSchema);
module.exports = movieModel;
