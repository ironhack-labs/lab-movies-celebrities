const { Schema, model, SchemaTypes } = require('mongoose')

const movieSchema = new Schema(
    {
        title:String, 
        genre:String, 
        plot:String, 
        cast:[{
            type: SchemaTypes.ObjectId, 
            ref:'Celebrity'}]
    },
    { timestamps: true }
)
module.exports = model('Movie', movieSchema)