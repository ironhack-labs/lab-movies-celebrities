// Iteration #1

const mongoose = require("mongoose")

//SCHEMA
const moviesSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    genre: {
        type:String,
        required: true
    },
    plot: {
        type:String,
        required: true
    },
    // cast: {
    //     type:[String],
    //     required: true
    // }
    cast: [
		{
			type: mongoose.Schema.Types.ObjectID, 
			ref: "Cele"
		}
	]
})

// cast: [3a5sd4f5a6sd545, 5a6s5d4f56asd45f4, f4a45sdfasdfasd, d5f4a6s5d4f56as4d]
//MODELO
const Movies = mongoose.model("Movies", moviesSchema)

//EXPORTACION
module.exports = Movies