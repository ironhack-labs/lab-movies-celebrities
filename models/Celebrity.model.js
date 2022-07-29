const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Add the celebritie name"],
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String,
    }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;