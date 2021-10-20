const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  }
);

module.exports = model('Movie', movieSchema);
