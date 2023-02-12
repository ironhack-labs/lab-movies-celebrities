const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
        },
        plot: {
            type: String,
        },
        cast: [{
            ref: 'celebrity',
            type: Schema.Types.ObjectId
        }]
    },
    { timestamps: true }
)
const Movie = model('movie', movieSchema)

module.exports = Movie