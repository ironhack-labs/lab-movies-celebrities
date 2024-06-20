const {Schema, model} = require("mongoose");

const celebrityModel = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    }
)

module.exports = model("Celebrity", celebrityModel);