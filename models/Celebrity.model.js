const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
    name: {
        type: String,
        default: 'unknown',
        trim: true,
        required: true
    },
    occupation: {
        type: String,
        default: 'unknown',
        trim: true,
        required: true
    },
    catchPhrase: {
        type: String,
        default: 'unknown',
        trime: true,
        required: true
    },
    }, {
    timestamps: true
 });

const Celebrity = model('celebrity', celebritySchema);
module.exports = Celebrity;
