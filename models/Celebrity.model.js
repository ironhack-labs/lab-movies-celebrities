
const { Schema, model } = require("mongoose");

const schemaCelebrity = new Schema({
          
    name:String,
    occupation : String,
    catchPhrase: String
    
})

const Celebrity = model("Celebrity", schemaCelebrity);

module.exports = Celebrity;