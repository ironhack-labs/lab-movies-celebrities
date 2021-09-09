const {Schema, model} = require("mongoose");

const celebritySchema = new Schema({

    name: {type: String, required: true},
    occupation: {type: String, required: true},
    catchPhrase: {type: String, required: true},
    
});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
