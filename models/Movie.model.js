///PASOS PARA CREAR UN MODELO
const mongoose = require("mongoose");
// 1.Importamos mongoose
const { Schema, model } = require('mongoose');
// 2.Creamos la Schema/ Plantilla
const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [ { type: Schema.Types.ObjectId,ref: "Celebrity"}],
},{
    timestamps: true // Inserta en la base de datos la fecha de cuando fue creada.
});
// 3.Creamos una constante del modelo
const Movie = model("Movie", movieSchema);

// 4.Exportamos el modelo
module.exports = Movie;
 