//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const celebritySchema = new Schema ({
    name: {
        type: String,
        trim: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
        required : true
    },
    occupation: {
        type: String,
        default: 'Nombre desconocido',
        trim: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
        required: true

    },
    catchPhrase: {
        type: String,
        required: true
    }
})


const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity