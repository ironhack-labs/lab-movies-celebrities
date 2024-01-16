//  Add your code here
const {model, Schema} = require("mongoose");

const celebritySchema = new Schema ({
    name:{type: String, required: [true, "Please add the celebrity's full name."]},
    occupation:{type: String, default:"unknown"},
    catchPhrase:{type: String},
    image:{type: String}
});

module.exports = model('Celebrity', celebritySchema);