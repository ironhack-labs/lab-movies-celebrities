const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: String, 
    genre: String, 
    plot: String,
    cast: {
        req: 'celebrity',
        type: Array
    }
})

const MovieModel = mongoose.model('movie', MovieSchema)

module.exports = MovieModel
