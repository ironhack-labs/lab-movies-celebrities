const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Celebrities" }],
});

const Movies = model("Movies", movieSchema);

module.exports = Movies;
