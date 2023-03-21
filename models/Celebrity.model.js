//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = {
    name: String,
    occupation: String,
    catchPhrase: String
}

module.exports = model('Celebrity',celebritySchema)