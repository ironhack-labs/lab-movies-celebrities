//  Add your code here
const mongoose = require('mongoose');

const celebrity = new mongoose.Schema({
    name:{
        type: String,
    },
    occupation:{
        type: String,
    },
    catchPhrase:{
        type: String,  
    }
})

const Celebrity = mongoose.model('Celebrity', CelebritySchema);

module.exports = Celebrity;