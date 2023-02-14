const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    
    title: String,
    genre: String,
    plot: String,
    cast: [
        { type: mongoose.Schema.Types.ObjectId,
        ref: "Celebrity"}
    ]
})

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie