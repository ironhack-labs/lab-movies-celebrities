//  Add your code here
const mongoose = require("mongoose")


//schema
const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: {
        type: [Object],
        ref: "Celebrity"
    }
})

//modelo
const Movie=mongoose.model("movies", movieSchema)

//exportación
module.exports = Movie