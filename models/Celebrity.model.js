//  Add your code here
const {Schema, model } = require('mongoose');

const celebSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: {
        type: String,
        required: false,
    }
});

const CelebModel = model('celebrity', celebSchema);
module.exports = CelebModel;