const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: []
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movies', moviesSchema);
