const { Schema, model } = require("mongoose");


const moviesSchema = new Schema(
    {
        image: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        genre: {
            type: String,
            require: true
        },
        plot: {
            type: String, require: true
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: "Celebs",
            require: true
        }],
    },
    {
        timestamps: true
    }
);

const Movies = model("Movies", moviesSchema);

module.exports = Movies;
