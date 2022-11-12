//  Add your code here
const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true

        },
        genre: {
            type: String,
            required: true
        },
        plot: {
            type: String,
            required: true
        },
        cast: {
            type: [mongoose.Types.ObjectId],
            ref: 'Celebrity',
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Movies', moviesSchema)