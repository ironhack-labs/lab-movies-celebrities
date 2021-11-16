const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
    { 
        title: {type: String, required: true},
        genre: {type: String, required: true},
        plot: {type: String, required: true},
        cast: []
    }
)

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;