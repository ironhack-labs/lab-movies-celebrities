//  Add your code here
const {Schema, model} = require('mongoose');

const celebSchema = new Schema(
    {
     name: String,
     occupation: String,
     catchPhrase: String,
    },
    {
        timestamps: true
    }
);

const Celebrities = model("Celebrity", celebSchema);

module.exports = Celebrities;