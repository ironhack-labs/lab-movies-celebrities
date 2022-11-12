//  Add your code here

const mongoose = require('mongoose')

const celebritiesSchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Celebrity', celebritiesSchema)