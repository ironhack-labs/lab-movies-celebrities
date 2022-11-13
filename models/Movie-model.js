const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema(

    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity"
        }],
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', movieSchema);