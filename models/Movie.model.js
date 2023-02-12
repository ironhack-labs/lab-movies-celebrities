const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        // cast: String
        cast: [{
            ref: 'celebrity',                      // Nombre del modelo a relacionar
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true
    }
);

module.exports = model('movie', movieSchema)