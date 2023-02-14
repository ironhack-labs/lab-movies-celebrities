//  Add your code here
const {Schema, model} = require("mongoose");

const celebritySchema = new Schema(
    {
        name: String,
        ocuppation: String,
        catchPhrase: String

})

module.exports = model("Celebrity", celebritySchema);