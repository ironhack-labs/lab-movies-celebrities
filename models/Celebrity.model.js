const { Schema, model } = require("mongoose");

const celebModel = new Schema ({
    name:String,
    occupation: String,
    catchPhrase: String
})
const CelebrityModel = model("Celebrity", celebModel);
module.exports= CelebrityModel;
