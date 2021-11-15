//  Add your code here
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema({
  titleM: {
    type: String,
    // required: true,
    // unique: true
  },
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity.model' }]
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
