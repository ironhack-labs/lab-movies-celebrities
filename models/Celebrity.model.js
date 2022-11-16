//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const celebritySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            //removes any whitespace from the username
        },
        occupation: {
            type: String,
            required: true,
            //   lowercase: true,
        },
        catchPhrase: {
            type: String,
            required: true,
        },
    },
    // {
    //     // this second object adds extra properties: `createdAt` and `updatedAt`
    //     timestamps: true,
    // }
);

const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity