const { Schema, model } = require('mongoose')

const movieSchema = {
  title: String,
  genre: String,
  plot: String,
  cast: {
    type: [Schema.Types.ObjectId],
    ref: 'celebrity',
  },
}

const Movie = model('movie', movieSchema)
module.exports = Movie
