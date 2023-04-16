const { Schema, model } = require("mongoose");

const movieModel = new Schema ({
    title:String,
    genre: String,
    plot: String,
   cast: Array
   // Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
})
const MovieModel = model("Movie", movieModel);
module.exports= MovieModel;
