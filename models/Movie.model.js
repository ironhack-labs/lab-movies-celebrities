const {Schema, model} = require('mongoose');

const Movie = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [Celebrity]
},
{
    timestamps: true
})

module.exports = model("Movie", Movie);