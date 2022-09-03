const { Schema, model } = require('mongoose')

const MovieSchema = new Schema(
    {
        title: { type: String},
        genre: { type: String},
        plot: { type: String },
        cast: [{ type: Schema.Types.ObjectId, ref: 'celebrities' }]
    }
) 

const MovieModel = model('movies', MovieSchema)
module.exports = MovieModel