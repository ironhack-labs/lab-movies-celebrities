const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: {
            type: String,
        },
        genre: {
            type: String,
            enum: ['drama', 'action', 'comedy', 'animation', 'biopic', 'horror', 'musical', 'romantic', 'science fiction', 'thriller', 'unknown'],
        },
        plot: {
            type: String,
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model('Movie', movieSchema)