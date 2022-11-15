const {Schema, model} = require('mongoose');

const moviesSchema = new Schema(
  {
    title: {type: String},
    genre: {type: String},
    plot: {type: String},
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrities'}]
    }
);

const Movies = model('Movies', moviesSchema);

module.exports = Movies;