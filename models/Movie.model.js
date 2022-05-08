const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    genre: String,
    plot: String,
    cast: [Schema.Types.ObjectId]
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;