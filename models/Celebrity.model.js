//  Add your code here

// Destructura los modulos/funciones de Schema y model de la libreria de mongoose
const { Schema, model } = require("mongoose")

// Crea el Schema de celebridades
const CelebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

// Exporta el modelo en la variable Celebrity tomando la info de Celebrity Schema
module.exports = model("Celebrity", CelebritySchema);