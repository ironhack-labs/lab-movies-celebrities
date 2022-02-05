const {Schema, model} = require ('mongoose')

const celebritiesSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
}, {
    timestamps:true
})

const Celebrities = model('celebrity', celebritiesSchema)

module.exports = Celebrities  