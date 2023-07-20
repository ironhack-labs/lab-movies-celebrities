const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  plot: {
    type: String,
    required: [true, 'Plot is required']
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrity'
  }]
}, {
  virtuals: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

movieSchema.virtual('contracts', {
  ref: 'Contract',
  localField: '_id',
  foreignField: 'movie',
  justOne: false,
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
