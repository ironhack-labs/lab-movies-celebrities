//  Add your code here
const { Schema, model } = require('mongoose');

const celebSchema = new Schema(
    {

        name: { type: String },
        occupation: { type: String},
        catchPhrase: { type: String},

    })

const celebModel = model('Celebrity', celebSchema);

module.exports = celebModel;