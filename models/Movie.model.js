const { Schema, model } = require('mongoose');

const moviesSchema = new Schema(
    {
        title: {
            type: String,
            requirted: true
        },
        genre: String,
        plot: String,
        cast: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
        }
    }
);

module.exports = model('Movie', moviesSchema)