//  Add your code here
const {Schema, model} = require("mongoose");

const CelebritySchema = new Schema ({
    name: String,
    occupation: String,
    catchPhrase: String,    
    });

module.exports = model ("Celebrity", CelebritySchema);