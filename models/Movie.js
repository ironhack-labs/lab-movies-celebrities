//  Add your code here
const mongoose = require("mongoose")
const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Celebrity"
    }]
})
const Movie = mongoose.model("Movie", movieSchema)
module.exports = Movie;