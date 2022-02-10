const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    // _id: {
    //     type: String
    // },
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
        required: true
    },
    cast:{
        type: [String]
    }
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie

