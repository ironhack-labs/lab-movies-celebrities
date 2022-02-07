// requerir mongoose y Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// hacer un nuevo schema
const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Celebrity'
            }
        ]
    },
    {
        timestamps: true
    }
)

// crear el modelo
const Movie = mongoose.model('Movie', movieSchema)

//exportar el modelo
module.exports = Movie