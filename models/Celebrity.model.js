const { Schema, model } = require("mongoose");

const celebritySchema = new Schema ({
    name: {
        type: String,
        unique: true,
        require: true
    },
    occupation: String,
    catchphrase: String
}, { 
    timestamps: true
})

const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;