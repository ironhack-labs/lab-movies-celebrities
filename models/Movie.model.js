const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      unique: true,
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,

      default: 'Unknown',
    },

    plot: {
      type: String,

      default: 'Unknown',
    },
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrity',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
