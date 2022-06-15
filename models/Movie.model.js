const {Schema,model, SchemaType} = require("mongoose")

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: String    
},{timestamps:true});

module.exports = model("MOVIE",movieSchema)