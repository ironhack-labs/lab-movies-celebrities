const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: {
        ref: 'celebrity',
        type: [mongoose.Schema.Types.ObjectId]
    }
})

const movieModel = mongoose.model('movie', moviesSchema);

module.exports = movieModel;


