//  Add your code here
const { Schema, model } = require("mongoose");

const celebSchema = new Schema({
    name: String,
    occupation: String,
    catchPrase: String,
  }
)

const celeb = model("celeb.model", celebSchema);

module.exports = celeb;