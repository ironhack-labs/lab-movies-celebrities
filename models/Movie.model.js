const { Schema, model} = require('mongoose')

const Movie = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{type: Schema.Types.ObjectId, ref: "celebrities"}]
    }
)

module.exports = model('movie', Movie)