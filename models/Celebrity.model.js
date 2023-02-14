//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema ({
    //This first object is the schema itself
    name: String,
    occupation: String,
    catchPhrase: String,

},{
//This second object is useful to know when this was created and when it was updated
//Created at: ; Updated at:
timestamps: true,
})

const Celebrity = model("Celebrity", celebritySchema)

module.exports = Celebrity