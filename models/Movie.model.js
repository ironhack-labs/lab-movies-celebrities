const { Schema, model } = require('mongoose')

const moviesScheme = new Schema(

    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrities'
        }]
    }

);

(
    {
        timestamps: true
    }

);

module.exports = model('Movies', moviesScheme)