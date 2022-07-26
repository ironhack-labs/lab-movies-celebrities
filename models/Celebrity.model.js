//  Add your code here
const { Schema, model } = require('mongoose')

//  Add your code here
const celebritySchema = new Schema(
    
    {
        name: String,
        occupation: String, 
        catchPhrases:String,
    },
    {
        timestamps: true
    }
)

module.exports =model('Celebrity', celebritySchema)
