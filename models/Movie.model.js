const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const MovieSchema = new Schema(
  {
    title: {
      type: String
    },
    genre: {
      type: String
    },
    plot: {
      type: String
    },
    cast: [{
      type: ObjectId,
      ref: 'celebrity'
    }]
  }
)

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;