const {Schema, model} = require('mongoose')

const moviesSchema = new Schema ({
    title: String,
    genre: String,
    plot: String,
    cast: [String],
},

{
    timestamps: true
})



module.exports = model('movies', moviesSchema);
