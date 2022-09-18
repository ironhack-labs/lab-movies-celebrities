//  Add your code here
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema ({

    
    title: {
        type: String
    },
    genre: {
        type: String
    },
    plot: {
        type: String
    },
    cast:  [{
            type: Schema.Types.ObjectId,
            ref: 'Celeb'
        }]
    
    

})

const Movie = model("Movie", movieSchema)// in the "" will be the collections name in lowercase in the database
module.exports = Movie;