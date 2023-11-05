const {Schema, model} = require ('mongoose')
const ObjectId = require("mongodb").ObjectId

const movieSchema =  new Schema (
    {
        title: String, 
        genre: String, 
        plot: String,
        cast: [{
            type: ObjectId,   
            ref: 'Celebritie'
        }],
    },
    {
        timestamps: true
    }
)

module.exports = model('Movie', movieSchema)