//  Add your code here
const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");
const Celebrity = require("./Celebrity.model");

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    }
)



const celebrity = model("celebrity", celebritySchema);

module.exports = celebrity;
