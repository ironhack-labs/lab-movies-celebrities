//Iteration #5: The movie model
const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  genre: {
    type: String,
    default: 'unknown',
  },
  plot: {
    type: String,
  },
  cast: {
    type: Schema.Types.ObjectId,
    ref: 'Celebrity',
  },
})

const Movie = model('Movie', movieSchema)

module.exports = Movie
