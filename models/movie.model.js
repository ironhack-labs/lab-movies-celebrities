const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({

    title: { type: String },
    genre: { type: String },
    plot: { type: String },
    cast: [{ type: Schema.Types.ObjectId, ref: 'celebrities' }]
})

const movieModel = model('movies', CommentSchema);

module.exports = movieModel;
