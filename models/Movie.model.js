const mongoose = require("mongoose"); // iteration 2F

const Schema = mongoose.Schema 

const movieSchema = new Schema ({
    title:{type:String, required: true}, 
    genre:{type:String, required: true}, 
    plot:{type:String},
    cast:[{type:Schema.Types.ObjectId, ref:'Celebrity'}] //iteration 5F
})

const Movie = mongoose.model("Movie", movieSchema)
module.exports = Movie