const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const celebritySchema = new Schema({
    name: {
        type: [String],
        required: true,
        trim: true,
    },
    occupation: {
        type: String,
        default: "unknown",
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

const CelebrityModel = model('Celebrity', celebritySchema)

module.exports = CelebrityModel

