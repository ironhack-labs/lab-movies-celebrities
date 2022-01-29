const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: {
      type: [Schema.Types.ObjectId],
      ref: "Celebrity",
    },
  },
  {
    toJSON: {
      virtuals: true, // doesn't seem to be needed
    },
  }
);

movieSchema.virtual("actors", {
  // this 'actors' name doesn't seem to matter
  ref: "Celebrity", // which model
  localField: "cast",
  foreignField: "_id",
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
