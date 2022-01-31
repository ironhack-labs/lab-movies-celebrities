const { Schema, model } = require("mongoose");

const moviesSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
});

module.exports = model("Movie", moviesSchema);
