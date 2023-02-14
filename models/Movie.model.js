const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast:[{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
}, {
    timestamps: true // 6
})

const Movie = model("Movie", movieSchema);

module.exports = Movie;