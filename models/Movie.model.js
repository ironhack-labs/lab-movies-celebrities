const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
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
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
  },
  {
    timestamps: true
  }
);

module.exports = model('Movie', movieSchema);