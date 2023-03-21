//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
    {
        name: {
            type: String,
            required: true 
        },
        occupation: {
            type: String,
            enum: ["actor", "singer", "comedian", "unknown"],
            required: true
        },
        catchPhrase: String,
    }
)

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;