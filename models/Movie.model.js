const { Schema , model } = require('mongoose');

const MovieSchema = new Schema (
  {
    title : String,
    genre : String,
    plot : String,
    cast : [{type: Schema.Types.ObjectId, ref: 'celebrity'}]
  }
)

module.exports = model('movie', MovieSchema);