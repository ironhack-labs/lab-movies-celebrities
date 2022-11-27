const { Schema, model} = require('mongoose');

const movieSchema = new Schema (
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        genre: {
            type: String,
            trim: true
        },
        plot: {
            type: String,
            trim: true
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]
    }
);

const Movie = model('Movie', movieSchema);
module.exports = Movie;