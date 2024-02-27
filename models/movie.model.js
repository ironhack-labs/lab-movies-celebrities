const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    plot: {
        type: String,
        required: [true, 'Plot is required']
    },
    cast: {
        type: [Schema.Types.ObjectId],
        ref: 'Celebrity'
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;