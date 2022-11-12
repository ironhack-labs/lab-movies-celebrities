//  Add your code here
const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema(
    {
        name: String,
        occupation: String,
        catchphrase: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Celebrity', celebritySchema);
