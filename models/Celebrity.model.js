const { Schema, model } = require('mongoose');

const celebritieSchema = new Schema ({
    name: String,
    occupation: String,
    catchPhrase: String
});

module.exports = model('Celebritie', celebritieSchema);