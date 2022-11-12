const mongoose = require('mongoose');
const { Schema } = mongoose;


const moviesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        plot: {
            type: String,
            required: true
        },
        cast: [{
            type: mongoose.Types.ObjectId,
            ref: 'Celebrity.model',
            required: true
        }]
    })

module.exports = mongoose.model('Movies', moviesSchema);
