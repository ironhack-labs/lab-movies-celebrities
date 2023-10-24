//  Add your code here
// item 2
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
    {
        name: { type: String, required: true },
        occupation: { type: String, enum: ['actor', 'comedian', 'singer', 'unknown'] },
        catchPhrase: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;