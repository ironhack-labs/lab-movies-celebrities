const { Schema, default: mongoose } = require("mongoose")

const movieSchema = new Schema({
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

    cast: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model(`Movie`, movieSchema)

module.exports = Movie