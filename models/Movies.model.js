//  Add your code here
const mongoose = require("mongoose")

const MovieSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Celebrity"
    }]
})

module.exports = mongoose.model("movie", MovieSchema);