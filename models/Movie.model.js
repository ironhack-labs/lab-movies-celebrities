const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{                                  // El corchete es necesario porque es un array de ObjectIDs
            type: Schema.Types.ObjectId,
            ref: 'Star'                             // Nombre del modelo referenciado
        }],
    },
    { timestamps: true }
)

module.exports = model('Movie', movieSchema)