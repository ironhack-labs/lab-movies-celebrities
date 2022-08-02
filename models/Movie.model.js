const {Schema, model} = require('mongoose');
const Movie = require('../models/Movie.model');

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{type: Schema.Types.ObjectID, ref: "Celebrity"}]
},
{
    timestamps: true
}
)



module.exports = model('Movie', movieSchema)