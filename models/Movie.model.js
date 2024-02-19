const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        genre: {
            String
        },
        plot: {
            type: String
        },
        cast: {
            type: [mongoose.Types.ObjectId],
            ref: "Celebrity",
        },
    });

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;