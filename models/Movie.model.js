const mongoose = require("mongoose"); //requiero de mongoose
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrity'
    }],

},

    {
        timestamps: true
    })

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie

