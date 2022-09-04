//  Add your code here
const { Schema, model } = require('mongoose')

const MovieSchema = Schema({
    title: { type: String },
    genre: { type: String },
    cast: [{ type: Schema.Types.ObjectId, ref: 'celebrities' }]
}, {
    timestamps: true
})

const MovieModel = model('movies', MovieSchema)
module.exports = MovieModel
