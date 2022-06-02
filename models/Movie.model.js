
const { Schema, model } = require("mongoose")

// Crear modelo de peliculas
const MovieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId, ref: "Celebrity"
    }]
})


module.exports = model("Movie", MovieSchema); 