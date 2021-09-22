//  Add your code here

//Importaciones

const mongoose = require('mongoose')

//Schema

const movieSchema = mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Celebrity'
    }
  ]
})

//Modelo

const Movie = mongoose.model('Movie', movieSchema)

//Exportacion

module.exports = Movie
