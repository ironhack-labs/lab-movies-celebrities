const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    title: {
        type: String,
        required: true
      },

      genre: String,

      plot: String,

      // below is an array of object IDs referencing the Celebrity model:
      cast: [          
         { type: Schema.Types.ObjectId,
         ref: 'Celebrity'
         } 
      ]
    });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;