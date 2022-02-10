// Iteration #1

const mongoose = require("mongoose")

//SCHEMA
const moviesSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    genre: {
        type:String,
        required: true
    },
    plot: {
        type:String,
        required: true
    },
    cast: {
        type:[String],
        required: true
    }
})

//MODELO
const Movies = mongoose.model("Movies", moviesSchema)

//EXPORTACION
module.exports = Movies