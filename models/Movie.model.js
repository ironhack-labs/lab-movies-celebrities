//  Add your code here
const { Schema, model }  = require('mongoose')

const movieModel = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{                                  // El corchete NO es necesario, solo si es un array de ObjectIDs
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'                             // Nombre del modelo referenciado
        }]
    }
)

module.exports = model('Movie', movieModel)
