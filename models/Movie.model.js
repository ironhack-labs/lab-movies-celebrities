//  Add your code here

// Destructura los modulos/funciones de Schema y model de la libreria de mongoose
const { Schema, model } = require("mongoose")

// Crear modelo de peliculas
const MovieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        // Hace referencia al modelo de celebridades donde estará vinculado por ID de la celebridad
        type: Schema.Types.ObjectId, ref: "Celebrity"
    }]
})

// Exporta el modelo en la variable Movie tomando la info de Movie Schema
module.exports = model("Movie", MovieSchema);