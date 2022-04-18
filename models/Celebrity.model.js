//  Add your code here
const { Schema, model } = require('mongoose')

const celebrityModel = new Schema(
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

module.exports = model('Celebrity', celebrityModel)
