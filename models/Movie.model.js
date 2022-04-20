const { Schema, model } = require('mongoose');
// const Celebrity = require('./Celebrity.model');

const moviesSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        // cast: [{type: Celebrity.Types.ObjectId()}]
        cast: [{type: Celebrity.Types.ObjectId, ref: 'Celebrity'}]
    }
)

const Movie = model('Movie', moviesSchema);

module.exports = Movie;