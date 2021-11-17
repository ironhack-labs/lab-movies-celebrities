const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema(
    {
        title :{type: String},
        genre :{type:String},
        plot :{type:String},
        cast: [
            { type: Schema.Types.ObjectId, ref: "Celebrity" }
          ]
    }
)

const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;