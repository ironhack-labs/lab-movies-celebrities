//COLLEcTIONS are DETERMINED BY THE SCHEMEA NAME!!!!!!
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
    catchphrase: {
        type: String
    }
    

})

const Celeb = model("Celeb", celebSchema)// in the "" will be the collections name in lowercase in the database
module.exports = Celeb;