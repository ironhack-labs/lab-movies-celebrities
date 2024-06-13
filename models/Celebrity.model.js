//  Add your code here
const { Schema, model } = require('mongoose');

const modelSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
}, {
    timestamps: true
});

const Model = model('Model', modelSchema);
module.exports = Model;