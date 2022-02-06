const { Schema, model, Mongoose } = require('mongoose')

const moviesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        plot: {
            type: String,
            required: true
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celeb',
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model('Movies', moviesSchema)