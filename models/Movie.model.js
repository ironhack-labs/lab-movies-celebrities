const { Schema, model } = require("mongoose");

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
  casts: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
});

module.exports = model("Movie", movieSchema);
