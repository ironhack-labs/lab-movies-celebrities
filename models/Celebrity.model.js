const mongoose = require('mongoose')

const celebritySchema = new mongoose.Schema({
    name:String,
    occupation:String,
    catchPhrase:String,
    age:Number
})

const Celebrity = mongoose.model('Celebrity',celebritySchema)

module.exports = Celebrity