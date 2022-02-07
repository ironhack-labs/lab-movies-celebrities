// const { Schema, model, Mongoose } = require('mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const celebritieSchema = new Schema(
    {
        name:String,
        occupation:String,
        catchphrase:String
    },
    {
        timestamps: true
    }
)

const celebritie = mongoose.model('celebritie', celebritieSchema)
module.exports=celebritie

// module.exports = model('celebritie',celebritieSchema)
