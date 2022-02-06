//  Add your code here

const { Schema, model } = require('mongoose')

const celebritySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    ocupation: String,
    catchPhrase: String
},
    { timestamps: true })

module.exports = model('Celebrity', celebritySchema)