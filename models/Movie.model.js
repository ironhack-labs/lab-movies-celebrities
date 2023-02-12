const { Schema, model } = require('mongoose')
const Celebrity = require('../models/Celebrity.model')

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            ref: 'celebrity',
            type: Schema.Types.ObjectId
        }]
    },
    {
        timesstamps: true
    }
)


module.exports = model('movie', movieSchema)