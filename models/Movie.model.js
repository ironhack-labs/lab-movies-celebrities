
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const movieSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required:true,
            minLength: 2,
            maxLegnth: 30
        },
        genre: {
            type: String,
            default: 'unknown'
        },
        plot: {
            type: String,
            default: 'unknown'
        },
        cast: [{
            type: mongoose.Types.ObjectId,
            ref: 'Celebrity'
        }]
    },
    {
    timestamps: true
    }
)

const Movie = mongoose.model('Movie', movieSchema)

module.exports= Movie