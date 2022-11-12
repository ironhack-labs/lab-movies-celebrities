//  Add your code here
const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const celebritySchema = new mongoose.Schema([
    {
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
    }
])
const Celebrity = model("celebrity", celebritySchema);

module.exports = Celebrity;
