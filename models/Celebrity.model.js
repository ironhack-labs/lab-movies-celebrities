const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema({
    name: { type: String },
    occupation: { type: String },
    catchPhrase: { type: String }
});

const CelebrityModel = model('celebrities', celebritiesSchema);

module.exports = CelebrityModel;
