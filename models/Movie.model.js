const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MovieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
}, {
    timestamps: true
})

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie