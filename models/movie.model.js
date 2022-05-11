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
    cast:[{  type: mongoose.Schema.Types.ObjectId,ref: 'Celebrity' }]
    

})


const MovieModel = mongoose.model("movies", movieSchema)
module.exports = MovieModel
