const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },

    occupation: String,

    catchPhrase: String
}, {
    timestamps: true
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity; 
