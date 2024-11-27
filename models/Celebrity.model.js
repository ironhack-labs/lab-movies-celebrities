//  ITERATION 2
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

module.exports = model('Celebrity', celebritySchema);
