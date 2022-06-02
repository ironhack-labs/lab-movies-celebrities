//  Add your code here
const {Schema, model} = require("mongoose")

const CelebritySchema=new Schema({
    name:String,
    occupation:String,
    catchPhrase:String
},{timestamps:true})

module.exports=model("Celebrity", CelebritySchema)