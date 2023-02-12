const { Schema, model } = require('mongoose');

// const celebrities = require('./../models/Celebrity.model')

const moviesSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            ref: 'celebrities',
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model('movies', moviesSchema)
