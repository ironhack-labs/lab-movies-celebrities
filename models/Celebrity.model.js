//  Add your code here

const {Schema,model, SchemaType} = require("mongoose")

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
},{timestamps:true});

module.exports = model("CELEBRITY",celebritySchema)