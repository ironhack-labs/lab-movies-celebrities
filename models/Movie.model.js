const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
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
        cast: [{
            type: mongoose.Types.ObjectId,
            ref: 'Celebrities',
            required: true
        }],
        image: {
            type: String,
            default: '/images/movie.png'
        }
    }
);

module.exports = mongoose.model('Movies', movieSchema);