const {Schema, model} = require("mongoose");
//  Add your code here

const celebritySchema = new Schema(
        {
        name: String,
        occupation: String,
        catchPhrase: String,
    },
    {
        timestamps: true
    }

    
)

const Celebtrity = model("Movie", celebritySchema);
module.exports = Celebtrity;