const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
  title: {type: String},
  genre: {type: String},
  plot: {type: String},
  cast:[{ type: mongoose.SchemaType.ObjectId, ref: "Celebrity" }]

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
