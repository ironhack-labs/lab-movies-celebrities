
const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    unique: true
  },

  genre: {
      type: String,
  },
  
  plot: {
    type:String
  },

  cast: [{                              // Es un array porque pueden tener varios autores
        type: Schema.Types.ObjectId,        // Tipo de datos ObjectId
        ref: 'Celebrity'                       // Nombre del modelo
    }],

}, {
  timestamps: true
})

const Movie = model("Movie", movieSchema);

module.exports = Movie;