const { Schema, model } = require('mongoose');

const movieSchema = new Schema (
    {
        title: String,
        genre: String,
        plot: String,
        plot: String,
        cast: Array,
    }
)

module.exports = model('Movie', movieSchema);