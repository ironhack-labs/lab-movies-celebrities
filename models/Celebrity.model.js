//  Add your code here
const {Schema, model} = require("mongoose");

const celebSchema = new Schema({
    name: String,
    occupation:{
        type: String,
        default: "Unknown",
    },
    catchPhrase: String
})

const Celeb = model("Celeb", celebSchema);

module.exports = Celeb;