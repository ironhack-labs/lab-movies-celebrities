//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
    {
        name: String,
        occupation: {
            type: String,
            enum: ["unknown", "actor", "singer", "comedian"]
        },
        catchPhrase: String,
    }

)


const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;