//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    name: String,
    occuation:String,
    catchPhrase:String
  });
  
  const CelebrityModel = mongoose.model("celebrity", celebritySchema);
  
  module.exports = CelebrityModel;
  