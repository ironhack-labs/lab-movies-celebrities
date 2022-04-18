const { Schema, model } = require('mongoose')

const movieSchema = new Schema(

    {
        title: { type: String },
        genre: { type: String },
        plot: { type: String },
        cast: [{                                  // El corchete NO es necesario, solo si es un array de ObjectIDs
            type: Schema.Types.ObjectId,
            ref: 'Celeb'                             // Nombre del modelo referenciado
        }],

    }

)
module.exports = model('Movie', movieSchema)