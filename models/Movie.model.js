const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: {
        ref: 'celebrity',
        type: mongoose.Schema.Types.ObjectId
    }
});


let MovieModel = mongoose.model('movie', MovieSchema);
module.exports = MovieModel;


