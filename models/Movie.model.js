
const mongoose = require('mongoose')
const { Schema } = mongoose;

const moviesSchema = new Schema({
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
        require: true,
        ref: 'Celebrity'
    }]
})

module.exports = mongoose.model("Movies", moviesSchema);
