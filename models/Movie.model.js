
// 1. IMPORTACIONES
const mongoose = require("mongoose")


// 2. SCHEMA
const userSchema = mongoose.Schema({

	title: {
		type: String,
		trim: true, // No puedes guardar en base de datos si mandas un dato con espacios en blanco
		required: true
	},
    genre: {
		type: String,
		trim: true, 
		required: true
	},
    plot: {
		type: String,
		trim: true,
		},
    cast: {
		type: Array,
		trim: true,
		},
    }, 	{timestamps: true}
)

// 3. MODEL
const User = mongoose.model("movies", userSchema)

// 4. EXPORTACIÓN
module.exports = User