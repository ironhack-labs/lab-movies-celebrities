const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Add the movie title']
    },
    genre: {
        type: String,
        required: [true, 'Add the movie genre']
    },
    plot: {
        type: String,
        required: true,
    },
    cast: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie