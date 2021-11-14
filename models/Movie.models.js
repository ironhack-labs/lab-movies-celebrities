const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
      type: String,
      unique: true
    },
    genre: String,
    plot: String,
    cast: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Celebrity',
        }
],
    image: String,
  });

  const Movie = model("Movie", movieSchema)

module.exports = Movie