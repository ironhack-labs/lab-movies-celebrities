const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    genre: String,
    plot: String,
    cast: [{type: mongoose.Schema.Types.ObjectId,ref: 'Celebrity'}]
})

const Movies = mongoose.model('Movies', moviesSchema)

module.exports = Movies