//  Add your code here
// models/Celebrity.model.js

// 1. IMPORTACIONES
const mongoose      = require("mongoose")

// 2. SCHEMA
const celebritySchema =  mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String

},{
    timestamps: true // INSERTA EN LA BASE DE DATOS LA FECHA EN QUE FUE CREADA
})


// 3. MODELO
const Celebrity = mongoose.model("Celebrity", celebritySchema)


// 4. EXPORTACIÓN
module.exports = Celebrity