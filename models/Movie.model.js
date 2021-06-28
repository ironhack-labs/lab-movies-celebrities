const mongoose = require('mongoose')

require("./Celebrity.model")

const MovieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [
        {
            ref: "celebrity",
            type: mongoose.Schema.Types.ObjectId
        }
    ] 
})

const MovieModel = mongoose.model('movie', MovieSchema)

module.exports = MovieModel