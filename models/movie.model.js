const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: String,
  plot: String,
  cast: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Celebrity'
  }
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;