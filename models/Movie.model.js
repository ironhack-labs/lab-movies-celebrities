const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Types.ObjectId,
            ref: 'Celebrity.model'
        }]
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('movieModel', movieSchema);