const mongoose = require("mongoose");
const Schema = mongoose.Schema

const moviesSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }
    ]
})

const Movies = mongoose.model("Movie", moviesSchema)
module.exports = Movies