//  Add your code here
const {Schema,model} = require ("mongoose");
const celebritySchema = new Schema (
//info that is going to be prompt
    {
    name: String,
    occupation: String,
    catchPhrase: String


});

module.exports = model("Celebrity", celebritySchema);