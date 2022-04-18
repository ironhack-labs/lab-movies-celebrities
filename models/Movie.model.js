const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    celebrities: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebritie'                             // Nombre del modelo referenciado
    }],

}, {
    timestamps: true
})

module.exports = model("movie", movieSchema)