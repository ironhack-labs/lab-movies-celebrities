//  Add your code here
const { Schema, model } = require('mongoose')

const CelebritySchema = Schema({
    name: { type: String },
    occupation: { type: String },
    catchPhrase: { type: String, required: true }
}, {
    timestamps: true
})

const CelebrityModel = model('celebrities', CelebritySchema)
module.exports = CelebrityModel
