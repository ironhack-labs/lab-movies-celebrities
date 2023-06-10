const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    plot: {
      type: String,
      required: true,
      trim: true,
    },
    cast: [{
      type: Schema.Types.ObjectId,
      ref: 'Celebrity'
    }]
  }
)

const Movie = model('Movie', movieSchema)

module.exports = Movie