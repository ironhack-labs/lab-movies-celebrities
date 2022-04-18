const { Schema, model } = require('mongoose')
const { getMaxListeners } = require('./Celebrity.model')
const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true

        },
        plot: String,
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrities'
        }]
    },
    {
        timestamps: true
    }
)
module.exports = model('Movie', movieSchema)