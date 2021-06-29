//  Add your code here
const {Schema, model, SchemaTypes} = require ("mongoose")

const MovieSchema = new Schema ({
    title:String,
    genre: String,
    plot: String,
    cast: [{
        type:Schema.Types.ObjectId,
        ref: "Celebrity",
    }]
})

module.exports = model ("Movie", MovieSchema)