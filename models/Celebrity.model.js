const { Schema } = require("mongoose");

//  Add your code here
const celebritySchema = new Schema(
    {
        name:{
            required: true,
            type: String
        },
        occupation:{
            required: true,
            type: String,
            enum: ["actor","singer","comedian","unknown"]
        },
        catchPhrase:{
            required: true,
            type: String
        }
    }
)

const Celebrity = model('Celebrity', celebritySchema);
module.exports = Celebrity;