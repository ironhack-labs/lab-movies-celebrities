const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, default: "unknown" },
  plot: { type: String, required: true },
  cast: [{ type: Schema.Types.ObjectId, ref: "{celebrities}" }],
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;
