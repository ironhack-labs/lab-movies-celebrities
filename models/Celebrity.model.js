/*Iteration #2: The Celebrity model
Our first step is to create the Celebrity model and add some celebrities in our database.*/

const mongoose = require("mongoose")

const celebritySchema = new mongoose.Schema({
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
    },
}, {
    timestamps: true
})

const Celebrity = mongoose.model("Celebrity", celebritySchema)

module.exports = Celebrity
