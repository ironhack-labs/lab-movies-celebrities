const mongoose = require("mongoose");
//const { Schema, model } = mongoose;
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: String,
    genre : String,
    plot: String,
    cast : [{type: Schema.Types.ObjectId, ref:'Celebrity'}]
  },
  {
    timestamps: true
  }
);

//module.exports = model("Model", modelSchema);

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie