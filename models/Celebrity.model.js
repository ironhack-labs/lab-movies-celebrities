const mongoose = require('mongoose')

const celebSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Add the artist name']
    },
    occupation: {
        type: String,
        required: [true, 'Add the artist occupation']
    },
    catchPhrase: {
        type: String,
        required: [true, 'Add a famous phrase']
    }
})

const Celebrity = mongoose.model('Celebrity', celebSchema)

module.exports = Celebrity