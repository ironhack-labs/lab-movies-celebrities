const {Schema, model} = require("mongoose");


const celebritySchema = new Schema (
    {
        name: String,
        occupation: String,
        catchPhrase: String
    }
);



const Celebrity = mode("Celebrity", celebritySchema);

module.exports = Celebrity;