const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Types = mongoose.Schema.Types
const model = mongoose.model


const movieSchema = new Schema({
    title: { type: String },
    genre: { type: String },
    plot: { type: String },
    cast: [{ type: Types.ObjectId, ref: 'Celebrity' }]
},
    {
        timestamps: true,
        versionKey: false,
    })

const MovieModel = model('Movie', movieSchema)

module.exports = MovieModel