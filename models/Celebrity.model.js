const {Schema, model} = require('mongoose');

const celebritySchema = new Schema ({
    name: String,
    occupation: String, 
    catchphrase: String,
});

const celebrity = model("Celebrity", celebritySchema);
module.exports = celebrity;
