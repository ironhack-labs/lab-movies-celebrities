const mongoose = require ('mongoose')
const celebritiesSchema = new mongoose.Schema({

    name: {
        type : String,
        required : [true, 'Name is required'] 
    },
    occupation: {
        type: String,
        enum: ['actor', 'actress', 'singer', 'comedian', 'unknown'] ,
        required: [true, 'Occupation is required']
    },
    catchPhrase: {
        type : String,
    },
    knownFor: {
        type: String,
        required: [true, 'Known for is required']
    }
})

const Celebrities = mongoose.model('Celebrities', celebritiesSchema)
module.exports = Celebrities