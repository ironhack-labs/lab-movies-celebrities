//  Add your code here
const mongoose = require('mongoose');

const celebritiesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            unique: true

        },
        ocupation: {
            type: String,
            required: true
        },
        catchPhrase: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Celebrities', celebritiesSchema)
