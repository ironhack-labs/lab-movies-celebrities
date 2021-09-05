const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
        type: String,
        default: 'unknown',
        trim: true,
        required: true
    },
    genre: {
        type: String,
        default: 'unknown',
        trim: true,
        required: true
    },
    plot: {
        type: String,
        default: 'unknown',
        trime: true,
        required: true
    },
    cast: [{
        type: Schema.Types.ObjectId,
        default: 'unknown',
        trime: true,
        required: true
    }],
    }, {
    timestamps: true
 });

const Movie = model('movie', movieSchema);
module.exports = Movie;
