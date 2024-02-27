const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema (
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [2, 'Name needs at least 2 chars']
        },
        occupation: {
            type: String,
            required: [true, 'Occupation is required'],
            minLength: [2, 'Occupation needs at least 2 chars']
        },
        catchPhrase: {
            type: String,
            required: [true, "Phrase is required"],
            minLength: [2, "Phrase needs at least 2 chars"]
        }

    },
    {timestamps: true}
);

const Celebrity = mongoose.model('Celebrity', celebritySchema);
module.exports = Celebrity;