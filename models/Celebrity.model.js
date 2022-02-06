//  Add your code here
const { Schema, model } = require('mongoose')
const celeSchema = new Schema(
    {
        name: String,
        ocupation: String,
        catchPhrase: String,
    }
);
module.exports = model('Cele', celeSchema)
