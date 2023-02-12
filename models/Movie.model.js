const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            ref: 'celebrity',
            type: Schema.Types.ObjectId
        }],
    },
    {
        timestamps: true
    }
)

module.exports = model('movie', movieSchema)

