const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Nombre desconocido',
        trim: true,
        //set: value => value.chartAt(0).toUpperCase() + value.substring(1)
    },
    genre: {
        type: String,
        trim: true
    },
    plot: {
        type: String,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    cast: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity" //Nombre del Modelo del que queremos obtener la info.
        }
    ],
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Movie', moviesSchema)