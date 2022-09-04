const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: { type: String },
        genre: { type: String },
        plot: { type: String },
        cast: [{ type: Schema.Types.ObjectId, ref: 'celebrity' }]
    },
    {
        timestamps: true,
    }
)

const movieModel = model('movie', movieSchema)

module.exports = movieModel