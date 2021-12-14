const {Schema, model} = require("mongoose");
//  Add your code here

const celebritySchema = new Schema(
        {
        name: String,
        occupation: String,
        catchPhrase: String,
    }

    
)

const Celebtrity = model("Celebrity", celebritySchema);
module.exports = Celebtrity;