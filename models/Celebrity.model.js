const { Schema, model } = require('mongoose');

const CelebritySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    occupation: {
        type: String,
        trim: true,
        default: 'Unknown'
    },
    catchPhrase: {
        type: String,
        required: true,
        trim: true
    }
})

const CelebrityModel = model('Celebrity', CelebritySchema);

module.exports = CelebrityModel;