const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    title: {
        type: String, 
        required: true, 
      },
      
    genre: {
        type: String, 
    },

    plot: {
        type: String, 
    },

    cast: [{
        type: Schema.Types.ObjectId, 
        ref: 'Celebrity'
    }]
      
    });

    const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;