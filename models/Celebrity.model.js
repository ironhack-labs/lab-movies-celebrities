const mongoose = require('mongoose');

//  Add your code here
const celebritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    catchphrase: {
        type: String,
        required: true
    }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;