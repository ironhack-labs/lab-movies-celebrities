const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required.'],
      unique: true
    },
    genre: {
      type: String,
      trim: true,
    },
    plot: {
      type: String,
    },
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}],
  },
  {
    timestamps: true
  }
);

module.exports = model('Movie', movieSchema);