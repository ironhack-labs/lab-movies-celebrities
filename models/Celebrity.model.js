const { Schema, model } = require('mongoose');

const celebrityeSchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,

    },
    {
        timestamps: true
    }
);

module.exports = model('Celebrity', celebrityeSchema);
