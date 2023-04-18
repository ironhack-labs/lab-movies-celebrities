const mongoose = require('mongoose');
const Movies = require('.Movies.model');
const Schema = mongoose.Schema

const movieSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true
    },
    plot: {
        type: String
    },
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "celebrity"
    }]



})
const Movies = mongoose.model("movie", moviesSchema)
module.exports = Movies