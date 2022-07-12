const { Schema, model } = require('mongoose')

const movieSchema = {
  title: String,
  genre: String,
  plot: String,
  cast: {
    type: [Schema.Types.ObjectId],
    model: 'Celebrities',
  },
}

const Movie = model('movie', movieSchema)
module.exports = Movie
