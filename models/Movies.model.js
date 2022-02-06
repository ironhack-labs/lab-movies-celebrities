const { Schema, model } = require('mongoose')

const moviesSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [Schema.Types.ObjectId]
    },
    {
        timestamps: true
    })






module.exports = model('Movies', moviesSchema)