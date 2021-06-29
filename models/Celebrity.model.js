const { Schema, model } = require("mongoose");

const CelebritySchema = new Schema(
    {
        name: String,
        ocupation: String,
        catchPhrase: String,
    },
    {
        timestamps: true,
    }
);


module.exports = model('Celebrity', CelebritySchema);
