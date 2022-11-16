//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const moviesSchema = new Schema(
    {
        title: {
            type: String,
        },
        genre: {
            type: String,
        },
        plot: {
            type: String,
        },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }],
    },
    {
        timestamps: true,
    }
);

const Movies = model("Movies", moviesSchema);
module.exports = Movies