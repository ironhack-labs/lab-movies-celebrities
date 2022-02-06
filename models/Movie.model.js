const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const movieSchema = new Schema (
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]
    },
    {
        timestamps: true
    }
)

const Movie = Mongoose.model("Movie", movieSchema)
module.exports = Movie