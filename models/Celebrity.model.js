const { Schema, model } = require('mongoose')

const celebritiSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        occupation: String,
        catchPhrase: String,
    },
    {
        timestamps: true
    }

)

module.exports = model('Celebrities', celebritiSchema)