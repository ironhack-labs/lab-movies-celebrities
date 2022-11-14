const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        genre: { type: String, required: true },
        plot: { type: String, required: true },
        cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Celebrity" }]

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', moviesSchema);