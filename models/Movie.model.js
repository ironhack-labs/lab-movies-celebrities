const { Schema, model } = require('mongoose');

const movieNewSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type:Schema.Types.ObjectId,
            ref:'Celebrity'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = model('MoviesNEW', movieNewSchema);