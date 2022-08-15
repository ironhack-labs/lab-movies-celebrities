//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    
    title: {type: String},
    genre: {type: String},
    plot: {type: String},
    cast: [{type: mongoose.Schema.Types.ObjectId, ref:"Celebrity"}],

  });

  const movie = mongoose.model('movie', movieSchema);

  module.exports = movie;