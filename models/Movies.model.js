const { Schema, model } = require('mongoose');

const moviesSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
        },
        genre: {
            type: String,
            default: 'Unknown',
        },
        plot: {
            type: String,
            default: 'Plot inexistent',
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'celebrities',
        }],
    },
    {
        timestamps: true
    }
);

module.exports = model('movies', moviesSchema)