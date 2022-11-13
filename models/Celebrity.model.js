
const mongoose = require('mongoose')

const celebritiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Nombre desconocido',
        trim: true,
        //set: value => value.chartAt(0).toUpperCase() + value.substring(1)
    },
    occupation: {
        type: String,
        trim: true,
    },
    catchPhrase: {
        type: String,
        minlength: 2,
        maxlength: 100,
        trim: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Celebrity', celebritiesSchema)