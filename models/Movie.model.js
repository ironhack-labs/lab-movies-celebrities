//  Add your code here
// Copied this from Student Portal code
const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
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

const Movie = model('movie', movieSchema);

module.exports = { Movie };
