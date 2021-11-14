const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;


const movieSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
    }],


    image: {
        type: String,
        // required: true
    }
})

module.exports = model('Movie', movieSchema);