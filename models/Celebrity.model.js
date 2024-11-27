const { Schema, default: mongoose } = require("mongoose");

//  Add your code here
const celebritySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    catchPhrase: {
        type: String,
        required: true
    }

})

const Celebrity = mongoose.model(`Celebrity`, celebritySchema)

module.exports = Celebrity