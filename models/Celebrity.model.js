const { Schema, model} = require('mongoose');

const celebritySchema = new Schema(
    {
        name: {
            type: String,
            trim: true, 
            required: [true, 'Name is required'],
            unique: true
        },
        occupation: {
            type: String,
            trim: true,
        },
        catchPhrase: {
            type: String,
            trim: true
        }
    }
);

const Celebrity = model('Celebrity', celebritySchema);
module.exports = Celebrity;