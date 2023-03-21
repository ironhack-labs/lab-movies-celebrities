//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
    {
        name: String,
        ocupation: String,
        catchPhrase: String,
    }
)

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;