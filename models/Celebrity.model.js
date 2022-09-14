//  Add your code here
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const celebSchema = new Schema ({

    
    name: {
        type: String
    },
    occupation: {
        type: String
    },
    catchPhrase: {
        type: String
    }
    

})

const Movie = model("Movie", movieSchema)
module.exports = Movie;