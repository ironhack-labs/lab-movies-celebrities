const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title of the movie is required']
        },
        genre: {
            type: String,
            required: [true, 'Genre of the movie is required']
        },
        plot: {
            type: String,
            required: [true, 'Plot of the movie is required']
        },
        cast: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Celebrity'
        }
    }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
