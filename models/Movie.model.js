const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    genre:{
        type: String,
    },
    plot:{
        type: String,  
    },
    cast:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Celebrity",
      },
    });

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

