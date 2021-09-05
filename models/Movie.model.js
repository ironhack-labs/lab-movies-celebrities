const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'unknown'
    },
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
    }],
}, { 
    timestamps: true 
})

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie
