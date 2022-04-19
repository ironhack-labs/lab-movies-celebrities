//  Add your code here
const { Schema, model } = require('mongoose');

//  example of one to many
const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }],
});

const Movie = model('Movie', movieSchema);
// this is how we export
module.exports = Movie;
