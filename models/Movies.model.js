const { Schema, model } = require('mongoose')

const moviesSchema = new Schema(
  {
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
    cast: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
      }
    ],
    url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Movies', moviesSchema)
