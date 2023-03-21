const {Schema, model} = require('mongoose');

const celebritySchema = new Schema ({
    name: String,
    occupation: String, 
    catchPhrase: String,
});

const celebrity = model("Celebrity", celebritySchema);
module.exports = celebrity;