//  Add your code here
const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
  title: { type: String, required: true },
  cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity', required: true }],
  celebrity: { type: Schema.Types.ObjectId, ref: 'Celebrity', required: true },
  genre: String,
  plot: String,
});

module.exports = model('Movie', movieSchema);
