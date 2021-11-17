const {Schema, model} = require('mongoose');

const movieSchema = new Schema ({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  plot: {type: String, required: true},
  cast: [{type: Schema.Types.ObjectId,  ref: 'Celebrity'}]
}, {versionKey: false, timestamps: true});

const Movie = model('Movie', movieSchema);

module.exports = Movie;