const { Schema,model } = require("mongoose");
const Celebrity = require("./Celebrity");

//  Add your code here
const  movieSchema = new Schema(
    {
        name:String,
        genre:String,
        plot:String,
        cast:[{type:Schema.Types.ObjectId,ref:'Celebrity'}],
    }
);

module.exports= model("Movie",movieSchema);