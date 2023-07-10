const mongoose = require('mongoose');

// const Celebrity = require('../models/Celebrity.model')

const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    genre: {
        type: String
    },
    plot: {
        type: String
    },
    cast: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Celebrity'
    }
}, 
{
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie