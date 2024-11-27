//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    plot: { type: String, required: true },
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],

});

const Movie = model("Movie", movieSchema);

module.exports = Movie;