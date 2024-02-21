//  Add your code here

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const celebSchema = new Schema (
    {
        name: {
            type: String
        },
        occupation: {
            type: String
        },
        catchPhrase: {
            type: String
        }
    }
)

const Celeb = mongoose.model('Celeb', celebSchema)

module.exports = Celeb