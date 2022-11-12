
const mongoose = require('mongoose')
const { Schema } = mongoose;

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

module.exports = mongoose.model("Celebrity", celebritySchema);
