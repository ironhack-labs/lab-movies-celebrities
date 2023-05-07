const { Schema, model } = require('mongoose');

const CelebrityModel = require('./Celebrity.model');

const movieSchema = new Schema(
    {
        title: {
            type: String
        },

        genre: {
            type: String
        },

        plot: {
            type: String
        },
        cast: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'Celebrity'
            }]
        },
    },
    {
        timestamps: true
    }
);
module.exports = model('Movie', movieSchema)
