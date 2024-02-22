const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        occupation: String,
        catchPhrase: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Celebrity', celebritySchema);