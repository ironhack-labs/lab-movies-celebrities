//  Add your code here
const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const celebritySchema=new Schema({
    name:{type: String, required: true},
    occupation:String,
    catchPhrase:String
});

module.exports = mongoose.model("Celebrity", celebritySchema);
