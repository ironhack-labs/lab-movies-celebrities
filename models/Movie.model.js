const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast:
            [{
                type: mongoose.Types.ObjectId, ref: 'Celebrity', required: true
            }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', movieSchema);
