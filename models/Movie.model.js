
// 1. IMPORTACIONES
const mongoose      = require("mongoose")


const movieSchema = mongoose.Schema({

    title: String,
    genre: String,
    plot: String,
    cast: [
       { type: mongoose.Schema.Types.ObjectId,
        ref: "Celebrity",
    }
    ]
}, {
    timestamps: true // INSERTA EN LA BASE DE DATOS LA FECHA EN QUE FUE CREADA
})

// 3. MODELO
const Movie = mongoose.model("Movie", movieSchema)


// 4. EXPORTACIÓN
module.exports = Movie