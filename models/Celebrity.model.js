const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
    name: {
        type: String
    },
    occupation: {
        type: String,
        default: 'unknown'
    },
    catchPhrase: {
        type: String
    }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;

