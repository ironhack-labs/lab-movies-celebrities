const { Schema, model } = require("mongoose");
// require("Celebrities")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const moviesSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrities'
    }]
},


    {
        timestamps: true
    })

const Movies = model("Movies", moviesSchema);

module.exports = Movies;
