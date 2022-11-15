const { Schema, model } = require('mongoose');

const moviesSchema = new Schema(
  {
    title: {
      type: String,
    },
    genre: {
        type: String,
    },
    plot: {
        type: String,
     },
     posts: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
    }
);

const Movies = model('Movies', moviesSchema);

module.exports = Movies;