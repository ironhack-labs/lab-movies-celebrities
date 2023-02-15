const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    genre: String,
    plot: String,
    cast: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Celebrity',}],
},
  {
    timestamps: true,
  });

const Movie = model("Movie", movieSchema);
module.exports = Movie
