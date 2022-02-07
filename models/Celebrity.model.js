//  Add your code here
// requerir mongoose y el Schema de mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// crear un nuevo Schema
const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    },
    {
        timestamps: true
    })

// crear el modelo
const Celebrity = mongoose.model('Celebrity', celebritySchema)

// exportar el modelo
module.exports = Celebrity



