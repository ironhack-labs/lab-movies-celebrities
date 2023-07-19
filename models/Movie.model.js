const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:String,
    genre:String,
    plot:String,
    // cast: {

    // }
})

const Movie = mongoose.model('movies',movieSchema)

module.exports = Movie