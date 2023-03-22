const {Schema, model} = require("mongoose");

const movieSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: String,
    },
    plot:{
        type:String,
        required: true,
    },
    cast:{
        type: Schema.Types.ObjectId,
        ref: "Celebrities",
    }
})

const Movie = model("Movie", movieSchema);

module.exports = Movie;