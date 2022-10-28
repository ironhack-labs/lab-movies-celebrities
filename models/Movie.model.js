const {Schema, model} = require('mongoose')

const movieSchema = new Schema ({
    title: String,
    genre: String,
    plot: String,
    cast: [Schema.Types.ObjectId]
});

module.exports = model('Movie', movieSchema);