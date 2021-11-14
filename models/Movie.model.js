//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    genre: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
