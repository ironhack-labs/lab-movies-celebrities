const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    genre: String,
    plot: String,
    cast: Array,
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;