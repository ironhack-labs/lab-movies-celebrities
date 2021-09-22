//  Add your code here
const mongoose = require("mongoose")


//schema
const celebritySchema = mongoose.Schema({
    name: String,
    ocupation: String,
    catchPhrase: String
})

//modelo
const Celebrity=mongoose.model("celebrities", celebritySchema)

//exportación
module.exports = Celebrity