// 1.IMPORTACIONES 
const mongoose = require("mongoose")

//2. SCHEMA
const celebritySchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    catchPhrase: {
        type: String,
        required: true,
    }
})

// 3. MODEL 
const Celebrity = mongoose.model("Celebrity", celebritySchema)

// 4. EXPORTACIÓN
module.exports = Celebrity