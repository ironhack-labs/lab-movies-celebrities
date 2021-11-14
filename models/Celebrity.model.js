//  Add your code here
const mongoose = require('mongoose')



// iteration 2 > crear modelo de celebrity 
const celebritySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },

        occupation: String,

        catchPhrase: String,
    },
    {
        timestamps: true,
    }
)

const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity
