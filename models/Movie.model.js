//  Add your code here
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: [{ type: Schema.Types.ObjectId, ref: 'name' }],
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = { Movie };
