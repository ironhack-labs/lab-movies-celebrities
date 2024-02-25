const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema =new Schema (
    {
        title: {
            require : true,
            type : String,
            trim : true //white spaces
        },
        director: {
            require : true,
            type : String,
        },
        genre: {
            require : true,
            type : String,
            enum: ['Action','Adventure','Comedy','Drama']
        },
        plot: {
            type : String,
        },
        cast: {
            type: [{}]
        }

    })
const Movie = mongoose.model('Movie', moviesSchema);

module .exports = Movie;