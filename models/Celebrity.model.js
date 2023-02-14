//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
}, {
    timestamps: true // 6
})

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;