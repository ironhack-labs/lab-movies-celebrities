const { Schema, model, SchemaTypes } = require('mongoose')

const movieSchema = new Schema({
title:String,
genre:String,
plot:String,
cast:[{
    type: Schema.Types.ObjectId,
    ref: 'celebritie'
}]
},
{
timestamps:true
})

module.exports = model('movie', movieSchema)