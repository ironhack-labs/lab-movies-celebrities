//  Add your code here
const {Schema, model} = require('mongoose')
const movieSchema = new Schema(
    {
        title:String,//
        genre:String,//
        plot:String,//
        cast:[{
            type:Schema.Types.ObjectId,
            ref:"Celebrity"
        }]
    },
    {
        timestamps:true //indicación de fecha y hora
    }
)
module.exports =model('Movie', movieSchema)