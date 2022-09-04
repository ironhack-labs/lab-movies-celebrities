const { Schema, model } = require('mongoose');

const MovieSchema = new Schema(
    {
        title: { type: String },
        genre: { type: String },
        plot: { type: String },
        cast: [{ type: Schema.Types.ObjectId, ref: 'celebrities' }]
    },
    {
        timestamps: true,
    }
);

const MoviesModel = model('movies', MovieSchema);

module.exports = MoviesModel;