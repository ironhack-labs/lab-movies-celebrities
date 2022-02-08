//  Add your code here
const { Schema, model } = require("mongoose");

const moviesSchema = new Schema(
    {
            title: String,
            genre: String, 
            plot: String,
            cast: Array,
        })

        module.exports = model('Movies', moviesSchema);