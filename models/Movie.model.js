const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
  },

  plot: {
    type: String,
  },

  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrity",
    },
    
    { timestamps: true },
  ],

  
});

movieSchema.virtual("celebrities", {
  ref: "Celebrity",
  localField: "cast",
  foreignField: "_id",
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
