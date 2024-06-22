//  Add your code here 

const { Schema, model, Types } = require('mongoose');

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'celebrity'}]
  }
)
const movieModel = model('movie', movieSchema)
module.exports = movieModel;