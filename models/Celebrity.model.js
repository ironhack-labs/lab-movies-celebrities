const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

const CelebrityModel = mongoose.model('celebritie', celebritySchema)

module.exports = CelebrityModel;