//  Add your code here

const { Schema, model } = require("mongoose");

const CelebritySchema = new Schema ({
    name: String,
    occupation: String,
    catchPhrase: String
})

const CelebrityModel = model("celebrity", CelebritySchema);
module.exports = CelebrityModel;

