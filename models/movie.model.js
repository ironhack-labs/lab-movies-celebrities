const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Movie schema
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: [String], // array of strings
    required: true 
  },
  plot: {
    type: String,
    required: true
  },
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Celebrity", // Reference to the Celebrity model
    },
  ],
});

// Create the Movie model
const Movie = mongoose.model("Movie", MovieSchema);

// Export the model
module.exports = Movie;