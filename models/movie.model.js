const mongoose = require ("mongoose")
// const { default: mongoose } = require("mongoose")

const movieSchema = new mongoose.Schema({

    title:{
        type: String,
    },
    genre:{
        type: String,
    },
    plot:{
        type: String,
    },
    cast:{
        enum:[String] 
    }

})


const MovieModel = mongoose.model("movies", movieSchema)
module.exports = MovieModel
