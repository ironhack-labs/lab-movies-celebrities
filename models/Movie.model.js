const { Schema, model } = require('mongoose');

const moviesSchema = new Schema({
    title: { type: String },
    genre: { type: String },
    plot: { type: String },
    cast: [{ type: Schema.Types.ObjectId, ref: 'celebrities' }]
});

const MovieModel = model('movies', moviesSchema);

module.exports = MovieModel;
