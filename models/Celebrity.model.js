//  Add your code here
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Celebrity = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

module.exports = mongoose.model("Celebrity", Celebrity)