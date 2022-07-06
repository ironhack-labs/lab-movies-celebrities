//  Add your code here
const {Schema, model} = require('mongoose')
const celebritySchema = new Schema(
    {
        name:String,//Tom cruise
        occupation:String,//what the celebrity does
        catchPhrase:String,//every celebrity needs a good catch phrase
    },
    {
        timestamps:true //indicación de fecha y hora
    }
)
module.exports =model('Celebrity', celebritySchema)