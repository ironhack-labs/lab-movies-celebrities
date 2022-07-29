const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Add the movie name"],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    plot: {
        type: String,
        required: [true, 'Plot is required']
    },
    cast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrity',
        required: [true, 'Add some Celebrity']
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;