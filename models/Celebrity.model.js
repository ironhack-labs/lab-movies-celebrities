const { Schema, model } = require("mongoose")

const celebritySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        occupation: String,
        catchPhrase: String
    },
    {
        timestamps: true
    }
)

module.exports = model('celebrity', celebritySchema)