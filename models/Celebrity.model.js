const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    occupation: {
        type: String
    },
    catchPhrase: {
        type: String
    }
})
const Celebrities = mongoose.model("celebrity", celebritySchema)
module.exports = Celebrities