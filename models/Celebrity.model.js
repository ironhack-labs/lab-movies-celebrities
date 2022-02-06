const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const celebritySchema = new Schema(
    {
        name: String,
        occupation: {
            type: String,
            default: 'unknown'
        },
        catchPhrase: String,
        imageUrl: String
    },
    {
        timestamps: true
    }
)

const Celebrity = Mongoose.model("Celebrity", celebritySchema)
module.exports = Celebrity