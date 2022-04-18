const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: String,
        gnre: String,
        plot: String,
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]

    }, { timestamps: true })

module.exports = model('Movie', movieSchema)