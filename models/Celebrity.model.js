//  Add your code here
const { Schema, model } = require('mongoose');


const celebritySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        occupation: {
            type: String,
            default: 'Exists'
        },
        catchPhrase: {
            type: String,
            unique: true,
            required: true
        }

    },
    {
        timestamps: true
    }
)



module.exports = model('Celebrity', celebritySchema);