const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required']
    },
    catchPhrase: {
        type: String,
        required: [true, 'Catchphrase is required']
    }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;