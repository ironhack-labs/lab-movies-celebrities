//  Add your code here
const { Schema, model } = require('mongoose');

const CelebritySchema = new Schema(
    {
        name: { type: String },
        occupation: { type: String },
        catchPhrase: { type: String }
    },
    {
        timestamps: true,
    }
);

const CelebrityModel = model('celebrities', CelebritySchema);

module.exports = CelebrityModel;
