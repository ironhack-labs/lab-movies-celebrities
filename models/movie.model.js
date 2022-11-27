const mongoose = require('mongoose');

const { Schema} = mongoose;

const movieSchema = new Schema ({
    title: { type: String },
    genre: { type: String},
    plot: { type: String},

})


const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie; 