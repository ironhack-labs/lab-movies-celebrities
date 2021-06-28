//  Add your code here
const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: {
        ref: 'Celebrity',
        type: mongoose.Schema.Types.ObjectId
    }
});

const MovieModel = mongoose.model('movie', MovieSchema)

module.exports = MovieModel