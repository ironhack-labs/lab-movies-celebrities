const mongoose = require('mongoose');

const movie = new mongoose.Schema({
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
       type: Schema.Types.ObjectId, ref: "Celebrity"
    }
})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

