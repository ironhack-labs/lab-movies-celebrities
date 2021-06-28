//  Add your code here
const mongoose = require('mongoose')

const CelebritySchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

const CelebrityModel = mongoose.model('celebrity', CelebritySchema)

module.exports = CelebrityModel