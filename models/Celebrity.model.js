
// 1. IMPORTACIONES
const mongoose = require("mongoose")


// 2. SCHEMA
const userSchema = mongoose.Schema({

	name: {
		type: String,
		trim: true, // No puedes guardar en base de datos si mandas un dato con espacios en blanco
		required: true
	},
    occupation: {
		type: String,
		trim: true, 
		required: true
	},
    catchPhrase: {
		type: String,
		trim: true,
		}
    }, 	{timestamps: true}
)

// 3. MODEL
const User = mongoose.model("User", userSchema)

// 4. EXPORTACIÓN
module.exports = User