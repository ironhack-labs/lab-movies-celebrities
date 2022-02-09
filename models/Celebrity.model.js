const mongoose = require('mongoose');

const celebritySchema = mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
