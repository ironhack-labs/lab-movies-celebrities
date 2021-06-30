const {Schema, model } = require("mongoose");

const CelebritySchema = new Schema ({
    name: String,
    occupation: String, 
    /*  { type: String, enum: ['Actor', 'Singer', 'Comedian', 'Unknown'] }, */
    catchPhrase: String, 
});

module.exports = model("Celebrity", CelebritySchema);