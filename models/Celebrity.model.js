const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema(
    {
        name: String,
        occupation: String,
        cathPhrase: String,
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('CelebrityModel', celebritySchema);