const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  plot: {
    type: String,
    required: true
  },
  cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Celebrity'
  }]
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
