const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        occupation: {
            type: String,
            default: 'Unknown',
        },
        catchPhrase: {
            type: String,
            default: 'Oh no! I do not have a catch phrase',
        },
    },
    {
        timestamps: true
    }
);

module.exports = model('celebrities', celebritiesSchema)