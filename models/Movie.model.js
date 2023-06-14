const { Schema, model } = require('mongoose');
//const { celebritySchema } = require('./Celebrity.model.js')

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ 
        type: Schema.ObjectId, 
        ref: 'Celebrity' 
    }]
})

const Movie = model('Movie', movieSchema);
module.exports = Movie;