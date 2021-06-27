const mongoose = require('mongoose')
const Celeb = require('./Celebrity.model')

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: String,
    plot: {
      type: String,
      default: '../images/Interrogante.jpeg',
    },
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Celeb,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
