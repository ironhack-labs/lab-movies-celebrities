const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    cast: {
        type: [Schema.Types.ObjectId],
        ref: 'Celebrity',
        required: true
    }
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
