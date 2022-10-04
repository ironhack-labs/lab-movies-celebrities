const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    celebrity: [{
        type: Schema.Types.ObjectId, 
        ref: "Celebrity"}]
    }
);

module.exports = model('Movie', movieSchema);