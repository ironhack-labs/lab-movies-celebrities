//  Add your code here
const {Schema,model,typeShema} = require ("mongoose")


const celebrityModel= new Schema({

name:String,
occupation:String,
catchPhrase:String,






},{timestamps:true})

module.exports = model ("CELEBRITY",celebrityModel)