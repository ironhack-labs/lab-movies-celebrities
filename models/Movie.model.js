//  Add your code here

const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");

const movieSchema = new Schema(
    {
        title: {
            type:String,
            required: true,
        },
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity"
        }]
    }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;