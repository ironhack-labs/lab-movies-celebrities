//  Add your code here
const {
    Schema,
    model
} = require("mongoose");

const celebritySchema = new Schema({
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // title: {type: String, require: true},
    name: {type: String, require: true},
    occupation: String,
    catchPhrase: String,

});

const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;

// a single line that does the same as 2 lines above
// module.exports = model("Celebrity", celebritySchema);