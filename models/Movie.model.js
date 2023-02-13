const { Schema, model } = require('mongoose')
const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [String]
    },
    {
        timestamps: true
    }
)
module.exports = model('movie', movieSchema)