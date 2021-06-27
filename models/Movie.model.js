const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    //cast: [{ celebrities }] //sacar referencia id de celebrities ??
}, {
    timestamps: true
})

const Movie = mongoose.model("movie", movieSchema)

module.exports = Movie