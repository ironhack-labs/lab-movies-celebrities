const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity" //Nombre del Modelo del que queremos obtener la info.
        }
    ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Movie', moviesSchema)