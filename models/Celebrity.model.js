//  Add your code here
const {
    Schema,
    model
} = require("mongoose");

const celebritySchema = new Schema({
    name: String,
    occupation: {
        type: String,
        default: "unknown"
    },
    catchPhrase: String,
}, );

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;