const mongoose = require('mongoose')
const Celebrity = require('./Celebrity.model')
const Schema = mongoose.Schema

let movieSchema = new Schema({
    title: String,
    genre: String, 
    plot: String,
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrity'
    }]
})

let Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie