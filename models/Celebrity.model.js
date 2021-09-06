//  Add your code here
const mongoose = require('mongoose')

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String, 
  occupation: String,
  catchPhrase: String,
}, {
  timestamps: true
})


const Celebrity = model("Celebrity", userSchema);

module.exports = Celebrity;