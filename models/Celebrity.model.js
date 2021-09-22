//  Add your code here
const mongoose = require("mongoose")
const { Schema, model } = require('mongoose');

//schema
const celebritySchema = new Schema({
    name: String,
    ocupation: String,
    catchPhrase: String
})

//modelo
const Celebrity= model("celebrities", celebritySchema)

//exportación
module.exports = Celebrity