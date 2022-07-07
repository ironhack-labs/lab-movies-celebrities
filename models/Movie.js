
const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
    }]
  },
);

//is first parameter correct? Is it just a variable and if so where does "book" go later?
module.exports = model('Movie', movieSchema);
