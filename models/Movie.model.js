const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [String]
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
