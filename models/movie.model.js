const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Celebrity',
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', moviesSchema);
