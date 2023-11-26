const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    genre: {
        type: String
    },
    plot: {
        type: String
    },
    cast : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrity',
        imageUrl:{
          type:  String
        } 
    }]
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;