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
     cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
      }]
    }
);

module.exports = model('Movies',moviesSchema)
