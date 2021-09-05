const mongoose = require("mongoose")
const Schema = mongoose.Schema

const { Schema, model } = require("mongoose");
const celebritySchema = new Schema({
  name: String,
    unique: true, 
  occupation: String,
  catchPhrase: String
 }) 

timestamps: true

const Celebrity = mongoose.model("Celebrity", celebritySchema)

module.exports = Celebrity
