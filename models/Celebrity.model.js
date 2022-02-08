const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CelebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
});

module.exports = model('Celebrity', CelebritySchema)