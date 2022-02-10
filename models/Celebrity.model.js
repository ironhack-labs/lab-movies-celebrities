// Iteration #1

const mongoose = require("mongoose")

//SCHEMA
const CeleSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    ocuppation: {
        type:String,
        required: true,
        default: "unknown"
    },
    catchPhrase: {
        type:String,
        required: true
    }
})

//MODELO
const Cele = mongoose.model("Cele", CeleSchema)

//EXPORTACION
module.exports = Cele
