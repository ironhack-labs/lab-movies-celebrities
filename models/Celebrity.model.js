const mongoose = require('mongoose');

const celebritiesSchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

const celebrityModel = mongoose.model('celebrity', celebritiesSchema);

module.exports = celebrityModel;