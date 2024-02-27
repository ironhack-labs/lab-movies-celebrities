const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    ocupation: {
        type: String,
    }, 
    catchPhrase: {
        type: String
    }
},
{
    timestamps: true
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;