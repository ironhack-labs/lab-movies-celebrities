const { Schema, model } = require("mongoose");

const movieSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  genre: String,
  plot: String,
  
  cast: [ {type: Schema.Types.ObjectId, ref: "Celebrity"}],
  //"Array" of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
  // ref: reference to the model --> "Celebrity"
},
{
  timestamps: true,
});

// model(name of the Model, variable of schema)
// mongoDB is going to take "Movie" and create collection--> "movies"
const Movie = model("Movie", movieSchema);
module.exports = Movie;


