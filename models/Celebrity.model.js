//  Add your code here
const {Schema, model} = require("mongoose");

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchphrase: {type: String, required: true, trim: true}
    },
    {
        timestamps: true,
    }
)

module.exports = model("Celebrity", celebritySchema)