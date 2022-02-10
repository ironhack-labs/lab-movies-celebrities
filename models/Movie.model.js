const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    plot:{
        type: String,
        
    },
    cast:{
        type: [String]
    }
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie

