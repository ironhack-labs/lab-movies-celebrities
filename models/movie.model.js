const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const movieSchema=new Schema({
    title: {type: String, required: true},
    genre:String,
    plot:String,
    cast:{ type: [Schema.Types.ObjectId] ,ref: 'Celebrity', required: true}
});

module.exports = mongoose.model("Movie", movieSchema);