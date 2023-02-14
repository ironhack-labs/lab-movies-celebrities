//  Add your code here

const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
    name: String,
    occupation: {
        type:String,
        required: true,
        default: "unknown"
    },
    catchPhrase: {type: String,
    required: true}
})



// exporting the model
module.exports = model('Celebrity', celebritySchema)