const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
});

const CelebrityModel =  model("Celebrity", celebritySchema);

module.exports = CelebrityModel;

